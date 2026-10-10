// Landmark indices from MediaPipe Pose:
// 11: left_shoulder, 12: right_shoulder
// 13: left_elbow, 14: right_elbow
// 15: left_wrist, 16: right_wrist
// 23: left_hip, 24: right_hip
// 25: left_knee, 26: right_knee
// 27: left_ankle, 28: right_ankle

export interface Point2D {
  x: number;
  y: number;
  visibility?: number;
}

export interface PoseLandmark {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
}

export function calculateAngle(a: Point2D, b: Point2D, c: Point2D): number {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);
  if (angle > 180.0) {
    angle = 360 - angle;
  }
  return Math.round(angle);
}

export type ExerciseAiType = 'squat' | 'pushup' | 'lunge' | 'bicep_curl';

export type TrainerTrackingStage = 
  | 'positioning'       // Required landmarks missing or low confidence (< 50%)
  | 'calibrating'       // User in frame, verifying stable starting pose
  | 'ready_countdown'   // Valid starting posture held; 3-second countdown active
  | 'tracking_active'   // Countdown complete; rep counting is active
  | 'paused_reposition'; // Tracking lost mid-workout; counting frozen safely

export interface RepState {
  stage: 'ready' | 'eccentric' | 'inflection' | 'concentric' | 'neutral';
  reps: number;
  currentAngle: number;
  trackingConfidence: number;
  formFeedback: string;
  isGoodForm: boolean;
  trainerStage: TrainerTrackingStage;
  countdownSeconds: number;
  calibrationProgress: number;
  justCompletedRep: boolean;
  statusHeadline: string;
  positioningGuide: string;
}

export class PoseRepTracker {
  exerciseType: ExerciseAiType;
  trainerStage: TrainerTrackingStage = 'positioning';
  
  // Exercise movement state machine
  exercisePhase: 'ready' | 'eccentric' | 'inflection' | 'concentric' = 'ready';
  reps: number = 0;
  formHistory: boolean[] = [];

  // Calibration & Countdown
  private stablePoseFrames: number = 0;
  private brokenPoseFrames: number = 0;
  private countdownStartMs: number | null = null;
  private countdownSeconds: number = 3;
  private calibrationProgress: number = 0;

  // Repetition timing & hysteresis
  private repStartMs: number = 0;
  private inflectionStartMs: number = 0;
  private lastRepMs: number = 0;
  private consecutiveLostFrames: number = 0;

  constructor(exerciseType: ExerciseAiType) {
    this.exerciseType = exerciseType;
  }

  reset() {
    this.trainerStage = 'positioning';
    this.exercisePhase = 'ready';
    this.reps = 0;
    this.formHistory = [];
    this.stablePoseFrames = 0;
    this.brokenPoseFrames = 0;
    this.countdownStartMs = null;
    this.countdownSeconds = 3;
    this.calibrationProgress = 0;
    this.repStartMs = 0;
    this.inflectionStartMs = 0;
    this.lastRepMs = 0;
    this.consecutiveLostFrames = 0;
  }

  setReps(count: number) {
    this.reps = Math.max(0, count);
  }

  getExerciseStartingPoseInstructions(): { title: string; cues: string[]; cameraTip: string } {
    switch (this.exerciseType) {
      case 'squat':
        return {
          title: 'Squat Starting Pose',
          cues: [
            'Stand tall with feet shoulder-width apart',
            'Legs and knees fully extended (> 160°)',
            'Keep head, hips, and ankles in camera view'
          ],
          cameraTip: 'Position phone 2–3m away at waist height in portrait view'
        };
      case 'pushup':
        return {
          title: 'Push-Up Starting Pose',
          cues: [
            'Hold top plank position with arms extended (> 150°)',
            'Body straight from shoulders to ankles',
            'Ensure shoulders, elbows, and hips are visible'
          ],
          cameraTip: 'Place phone 2m away on floor at a 45° side profile'
        };
      case 'bicep_curl':
        return {
          title: 'Bicep Curl Starting Pose',
          cues: [
            'Stand upright with arms extended straight down (> 140°)',
            'Pin elbows firmly to your sides',
            'Keep upper body and hands clearly in frame'
          ],
          cameraTip: 'Position phone 1.5–2m away framing upper body'
        };
      case 'lunge':
        return {
          title: 'Lunge Starting Pose',
          cues: [
            'Stand upright with feet together and knees extended (> 155°)',
            'Spine tall and shoulders back',
            'Position camera to capture full stride length'
          ],
          cameraTip: 'Position phone 2–3m away from a side profile'
        };
    }
  }

  private checkLandmarksVisibility(landmarks: PoseLandmark[]): {
    isVisible: boolean;
    confidence: number;
    missingMessage: string;
    side: 'left' | 'right';
  } {
    if (!landmarks || landmarks.length < 29) {
      return {
        isVisible: false,
        confidence: 0,
        missingMessage: 'Step into view so your body is visible in frame',
        side: 'left'
      };
    }

    const vis = (idx: number) => landmarks[idx]?.visibility ?? 0;

    if (this.exerciseType === 'squat' || this.exerciseType === 'lunge') {
      const leftVis = (vis(23) + vis(25) + vis(27)) / 3;
      const rightVis = (vis(24) + vis(26) + vis(28)) / 3;
      const isLeft = leftVis >= rightVis;
      const chosenSide = isLeft ? 'left' : 'right';
      const avgVis = isLeft ? leftVis : rightVis;

      const hipVis = isLeft ? vis(23) : vis(24);
      const kneeVis = isLeft ? vis(25) : vis(26);
      const ankleVis = isLeft ? vis(27) : vis(28);

      // Check specific missing joints
      if (ankleVis < 0.45) {
        return {
          isVisible: false,
          confidence: Math.round(avgVis * 100),
          missingMessage: 'Move farther back — ankles and feet are cut off',
          side: chosenSide
        };
      }
      if (kneeVis < 0.45 || hipVis < 0.45) {
        return {
          isVisible: false,
          confidence: Math.round(avgVis * 100),
          missingMessage: 'Step back until full legs and hips are visible',
          side: chosenSide
        };
      }

      return {
        isVisible: avgVis >= 0.5,
        confidence: Math.min(100, Math.round(avgVis * 100)),
        missingMessage: avgVis >= 0.5 ? '' : 'Increase room lighting or move closer to frame',
        side: chosenSide
      };
    }

    if (this.exerciseType === 'pushup') {
      const leftVis = (vis(11) + vis(13) + vis(15) + vis(23)) / 4;
      const rightVis = (vis(12) + vis(14) + vis(16) + vis(24)) / 4;
      const isLeft = leftVis >= rightVis;
      const chosenSide = isLeft ? 'left' : 'right';
      const avgVis = isLeft ? leftVis : rightVis;

      const shoulderVis = isLeft ? vis(11) : vis(12);
      const elbowVis = isLeft ? vis(13) : vis(14);
      const hipVis = isLeft ? vis(23) : vis(24);

      if (elbowVis < 0.4 || shoulderVis < 0.4) {
        return {
          isVisible: false,
          confidence: Math.round(avgVis * 100),
          missingMessage: 'Position camera to see upper body, shoulders, and elbows',
          side: chosenSide
        };
      }
      if (hipVis < 0.4) {
        return {
          isVisible: false,
          confidence: Math.round(avgVis * 100),
          missingMessage: 'Ensure your hips and torso are in camera view',
          side: chosenSide
        };
      }

      return {
        isVisible: avgVis >= 0.45,
        confidence: Math.min(100, Math.round(avgVis * 100)),
        missingMessage: avgVis >= 0.45 ? '' : 'Adjust angle so shoulders and hips are clearly visible',
        side: chosenSide
      };
    }

    // bicep_curl
    const leftArmVis = (vis(11) + vis(13) + vis(15)) / 3;
    const rightArmVis = (vis(12) + vis(14) + vis(16)) / 3;
    const isLeft = leftArmVis >= rightArmVis;
    const chosenSide = isLeft ? 'left' : 'right';
    const avgVis = isLeft ? leftArmVis : rightArmVis;

    if (avgVis < 0.45) {
      return {
        isVisible: false,
        confidence: Math.round(avgVis * 100),
        missingMessage: 'Ensure your arms and torso are clearly in view',
        side: chosenSide
      };
    }

    return {
      isVisible: true,
      confidence: Math.min(100, Math.round(avgVis * 100)),
      missingMessage: '',
      side: chosenSide
    };
  }

  private checkStartingPose(
    landmarks: PoseLandmark[], 
    side: 'left' | 'right'
  ): { isValid: boolean; angle: number; cueMessage: string } {
    const isLeft = side === 'left';

    if (this.exerciseType === 'squat') {
      const hip = isLeft ? landmarks[23] : landmarks[24];
      const knee = isLeft ? landmarks[25] : landmarks[26];
      const ankle = isLeft ? landmarks[27] : landmarks[28];
      const angle = calculateAngle(hip, knee, ankle);

      // Standing upright requires knee angle > 158° and hip noticeably above knee
      const isUpright = angle >= 158 && hip.y < knee.y - 0.12 && knee.y < ankle.y - 0.12;

      if (isUpright) {
        return { isValid: true, angle, cueMessage: 'Starting pose verified: Standing tall' };
      }
      if (angle < 155) {
        return { isValid: false, angle, cueMessage: 'Stand up straight with knees fully locked to start' };
      }
      return { isValid: false, angle, cueMessage: 'Stand tall with feet planted and hips upright' };
    }

    if (this.exerciseType === 'pushup') {
      const shoulder = isLeft ? landmarks[11] : landmarks[12];
      const elbow = isLeft ? landmarks[13] : landmarks[14];
      const wrist = isLeft ? landmarks[15] : landmarks[16];
      const hip = isLeft ? landmarks[23] : landmarks[24];
      const knee = isLeft ? landmarks[25] : landmarks[26];

      const elbowAngle = calculateAngle(shoulder, elbow, wrist);
      const bodyAngle = calculateAngle(shoulder, hip, knee);

      // Top of push-up requires straight arms (> 150°) and straight plank body line (> 135°)
      const isPlank = elbowAngle >= 150 && bodyAngle >= 135;

      if (isPlank) {
        return { isValid: true, angle: elbowAngle, cueMessage: 'Starting pose verified: Top plank position' };
      }
      if (elbowAngle < 145) {
        return { isValid: false, angle: elbowAngle, cueMessage: 'Lock out your elbows in top plank position' };
      }
      return { isValid: false, angle: elbowAngle, cueMessage: 'Keep your body in a straight plank line' };
    }

    if (this.exerciseType === 'bicep_curl') {
      const shoulder = isLeft ? landmarks[11] : landmarks[12];
      const elbow = isLeft ? landmarks[13] : landmarks[14];
      const wrist = isLeft ? landmarks[15] : landmarks[16];
      const angle = calculateAngle(shoulder, elbow, wrist);

      // Starting position requires arms extended downward (> 140°)
      if (angle >= 140) {
        return { isValid: true, angle, cueMessage: 'Starting pose verified: Arms extended down' };
      }
      return { isValid: false, angle, cueMessage: 'Lower arms completely straight to your sides' };
    }

    // lunge
    const hip = isLeft ? landmarks[23] : landmarks[24];
    const knee = isLeft ? landmarks[25] : landmarks[26];
    const ankle = isLeft ? landmarks[27] : landmarks[28];
    const angle = calculateAngle(hip, knee, ankle);

    if (angle >= 155) {
      return { isValid: true, angle, cueMessage: 'Starting pose verified: Standing tall' };
    }
    return { isValid: false, angle, cueMessage: 'Stand tall with feet together to begin' };
  }

  processLandmarks(landmarks: PoseLandmark[] | null, timestampMs: number = performance.now()): RepState {
    const now = timestampMs;

    // 1. Check Landmark Visibility
    if (!landmarks) {
      this.handleTrackingLoss();
      return this.buildState(0, 0, 'No body detected in camera feed', false, false);
    }

    const visCheck = this.checkLandmarksVisibility(landmarks);
    if (!visCheck.isVisible) {
      this.handleTrackingLoss();
      return this.buildState(
        0, 
        visCheck.confidence, 
        visCheck.missingMessage || 'Reposition so all exercise joints are visible', 
        false, 
        false
      );
    }

    this.consecutiveLostFrames = 0;

    // 2. Check Starting Pose Validity
    const poseCheck = this.checkStartingPose(landmarks, visCheck.side);
    const angle = poseCheck.angle;

    // 3. Execution of Ready State Machine (positioning -> calibrating -> ready_countdown -> tracking_active)
    if (this.trainerStage === 'positioning') {
      if (poseCheck.isValid) {
        this.trainerStage = 'calibrating';
        this.stablePoseFrames = 1;
        this.calibrationProgress = 10;
        return this.buildState(angle, visCheck.confidence, 'CALIBRATING: Hold starting position...', true, false);
      } else {
        this.stablePoseFrames = 0;
        this.calibrationProgress = 0;
        return this.buildState(angle, visCheck.confidence, poseCheck.cueMessage, false, false);
      }
    }

    if (this.trainerStage === 'calibrating') {
      if (poseCheck.isValid) {
        this.stablePoseFrames++;
        this.calibrationProgress = Math.min(100, Math.round((this.stablePoseFrames / 10) * 100));

        if (this.stablePoseFrames >= 10) {
          // Calibration locked! Transition into 3-second countdown
          this.trainerStage = 'ready_countdown';
          this.countdownStartMs = now;
          this.countdownSeconds = 3;
          return this.buildState(angle, visCheck.confidence, 'GET READY! 3... 2... 1...', true, false);
        }
        return this.buildState(angle, visCheck.confidence, `CALIBRATING: Hold steady (${this.calibrationProgress}%)`, true, false);
      } else {
        // User broke starting pose during calibration
        this.stablePoseFrames = 0;
        this.calibrationProgress = 0;
        this.trainerStage = 'positioning';
        return this.buildState(angle, visCheck.confidence, poseCheck.cueMessage, false, false);
      }
    }

    if (this.trainerStage === 'ready_countdown') {
      if (!poseCheck.isValid) {
        this.brokenPoseFrames++;
        if (this.brokenPoseFrames > 4) {
          // Starting pose lost during countdown -> abort countdown and recalibrate!
          this.countdownStartMs = null;
          this.stablePoseFrames = 0;
          this.brokenPoseFrames = 0;
          this.calibrationProgress = 0;
          this.trainerStage = 'calibrating';
          return this.buildState(angle, visCheck.confidence, 'Starting pose shifted — countdown reset', false, false);
        }
      } else {
        this.brokenPoseFrames = 0;
      }

      const elapsed = now - (this.countdownStartMs || now);
      if (elapsed < 1000) {
        this.countdownSeconds = 3;
      } else if (elapsed < 2000) {
        this.countdownSeconds = 2;
      } else if (elapsed < 3000) {
        this.countdownSeconds = 1;
      } else {
        // Countdown completed! Enable live rep tracking
        this.trainerStage = 'tracking_active';
        this.exercisePhase = 'ready';
        this.countdownSeconds = 0;
        this.repStartMs = 0;
        this.lastRepMs = now;
        return this.buildState(angle, visCheck.confidence, 'TRACKING ACTIVE — Begin your set!', true, false);
      }

      return this.buildState(angle, visCheck.confidence, `Hold starting pose: ${this.countdownSeconds}...`, true, false);
    }

    if (this.trainerStage === 'paused_reposition') {
      // User lost tracking during workout and is returning to frame
      if (poseCheck.isValid) {
        this.stablePoseFrames++;
        if (this.stablePoseFrames >= 5) {
          this.trainerStage = 'tracking_active';
          this.exercisePhase = 'ready';
          return this.buildState(angle, visCheck.confidence, 'Tracking resumed — continue reps', true, false);
        }
        return this.buildState(angle, visCheck.confidence, 'Stabilizing starting posture to resume...', true, false);
      } else {
        this.stablePoseFrames = 0;
        return this.buildState(angle, visCheck.confidence, 'Return to starting position to resume set', false, false);
      }
    }

    // 4. ACTIVE REPETITION COUNTING STATE MACHINE (trainerStage === 'tracking_active')
    return this.processActiveMovement(angle, now, visCheck.confidence);
  }

  private handleTrackingLoss() {
    this.consecutiveLostFrames++;
    if (this.trainerStage === 'tracking_active' && this.consecutiveLostFrames > 4) {
      // Freeze counting safely, do not discard existing reps
      this.trainerStage = 'paused_reposition';
      this.exercisePhase = 'ready';
      this.stablePoseFrames = 0;
    } else if (this.trainerStage === 'ready_countdown') {
      this.trainerStage = 'positioning';
      this.stablePoseFrames = 0;
      this.countdownStartMs = null;
    } else if (this.trainerStage === 'calibrating') {
      this.trainerStage = 'positioning';
      this.stablePoseFrames = 0;
      this.calibrationProgress = 0;
    }
  }

  private processActiveMovement(angle: number, now: number, confidence: number): RepState {
    let completedRep = false;
    let feedback = 'Maintain steady cadence';
    let isGoodForm = true;

    if (this.exerciseType === 'squat') {
      switch (this.exercisePhase) {
        case 'ready':
          if (angle < 145) {
            this.exercisePhase = 'eccentric';
            this.repStartMs = now;
            feedback = 'Descending... aim for parallel depth (thighs flat)';
          } else {
            feedback = 'Ready: Begin squat descent';
          }
          break;

        case 'eccentric':
          if (angle <= 100) {
            // Target parallel depth reached!
            this.exercisePhase = 'inflection';
            this.inflectionStartMs = now;
            feedback = 'Great parallel depth! Now drive up through your mid-foot';
          } else if (angle > 155) {
            // Aborted descent before reaching parallel depth -> Incomplete rep
            this.exercisePhase = 'ready';
            feedback = 'Incomplete depth — thighs must break parallel before standing';
            isGoodForm = false;
          } else {
            feedback = 'Squat lower to break parallel';
          }
          break;

        case 'inflection':
          // Require at least 80ms at depth to prevent single-frame noise spikes
          if (angle > 115 && now - this.inflectionStartMs >= 80) {
            this.exercisePhase = 'concentric';
            feedback = 'Drive up tall to full quad lockout!';
          } else {
            feedback = 'Hold depth, now press upward';
          }
          break;

        case 'concentric':
          if (angle >= 158) {
            const totalRepMs = now - this.repStartMs;
            // Validate minimum repetition duration (at least 600ms) and debounce (at least 400ms since last rep)
            if (totalRepMs >= 600 && now - this.lastRepMs >= 400) {
              this.reps += 1;
              this.lastRepMs = now;
              completedRep = true;
              this.formHistory.push(true);
              feedback = 'Rep complete! Excellent quad lockout.';
            }
            this.exercisePhase = 'ready';
          } else if (angle < 110) {
            // Reversed and dropped down again before locking out
            this.exercisePhase = 'eccentric';
          } else {
            feedback = 'Stand all the way up to complete the rep';
          }
          break;
      }
    } else if (this.exerciseType === 'pushup') {
      switch (this.exercisePhase) {
        case 'ready':
          if (angle < 135) {
            this.exercisePhase = 'eccentric';
            this.repStartMs = now;
            feedback = 'Lowering chest with controlled tempo';
          } else {
            feedback = 'Ready: Begin push-up descent';
          }
          break;

        case 'eccentric':
          if (angle <= 95) {
            // Target chest depth reached
            this.exercisePhase = 'inflection';
            this.inflectionStartMs = now;
            feedback = 'Good chest depth! Press through your palms';
          } else if (angle > 145) {
            // Aborted pushup without reaching 90° elbow depth
            this.exercisePhase = 'ready';
            feedback = 'Incomplete depth — lower until elbows reach 90°';
            isGoodForm = false;
          } else {
            feedback = 'Lower chest closer to the floor';
          }
          break;

        case 'inflection':
          if (angle > 115 && now - this.inflectionStartMs >= 80) {
            this.exercisePhase = 'concentric';
            feedback = 'Pressing up — keep spine rigid';
          }
          break;

        case 'concentric':
          if (angle >= 150) {
            const totalRepMs = now - this.repStartMs;
            if (totalRepMs >= 600 && now - this.lastRepMs >= 400) {
              this.reps += 1;
              this.lastRepMs = now;
              completedRep = true;
              this.formHistory.push(true);
              feedback = 'Rep counted! Solid chest drive.';
            }
            this.exercisePhase = 'ready';
          } else {
            feedback = 'Lock out elbows at the top';
          }
          break;
      }
    } else if (this.exerciseType === 'bicep_curl') {
      switch (this.exercisePhase) {
        case 'ready':
          if (angle < 125) {
            this.exercisePhase = 'eccentric'; // curling up
            this.repStartMs = now;
            feedback = 'Curling upward — keep elbows pinned';
          } else {
            feedback = 'Ready: Curl smooth without swinging';
          }
          break;

        case 'eccentric':
          if (angle <= 65) {
            this.exercisePhase = 'inflection';
            this.inflectionStartMs = now;
            feedback = 'Peak contraction! Squeeze biceps hard';
          } else if (angle > 135) {
            this.exercisePhase = 'ready';
            feedback = 'Incomplete curl — squeeze to peak flexion';
            isGoodForm = false;
          }
          break;

        case 'inflection':
          if (angle > 85 && now - this.inflectionStartMs >= 80) {
            this.exercisePhase = 'concentric'; // lowering down
            feedback = 'Control the 3-second negative descent';
          }
          break;

        case 'concentric':
          if (angle >= 140) {
            const totalRepMs = now - this.repStartMs;
            if (totalRepMs >= 600 && now - this.lastRepMs >= 400) {
              this.reps += 1;
              this.lastRepMs = now;
              completedRep = true;
              this.formHistory.push(true);
              feedback = 'Rep counted! Full bicep range of motion.';
            }
            this.exercisePhase = 'ready';
          } else {
            feedback = 'Extend arms all the way down';
          }
          break;
      }
    } else if (this.exerciseType === 'lunge') {
      switch (this.exercisePhase) {
        case 'ready':
          if (angle < 135) {
            this.exercisePhase = 'eccentric';
            this.repStartMs = now;
            feedback = 'Lowering into lunge stride';
          } else {
            feedback = 'Ready: Step into lunge';
          }
          break;

        case 'eccentric':
          if (angle <= 95) {
            this.exercisePhase = 'inflection';
            this.inflectionStartMs = now;
            feedback = 'Deep lunge depth reached! Torso tall';
          } else if (angle > 150) {
            this.exercisePhase = 'ready';
            feedback = 'Incomplete depth — drop rear knee lower';
            isGoodForm = false;
          }
          break;

        case 'inflection':
          if (angle > 115 && now - this.inflectionStartMs >= 80) {
            this.exercisePhase = 'concentric';
            feedback = 'Push through front heel to return tall';
          }
          break;

        case 'concentric':
          if (angle >= 155) {
            const totalRepMs = now - this.repStartMs;
            if (totalRepMs >= 600 && now - this.lastRepMs >= 400) {
              this.reps += 1;
              this.lastRepMs = now;
              completedRep = true;
              this.formHistory.push(true);
              feedback = 'Rep complete! Step tall.';
            }
            this.exercisePhase = 'ready';
          }
          break;
      }
    }

    return this.buildState(angle, confidence, feedback, isGoodForm, completedRep);
  }

  private buildState(
    currentAngle: number,
    trackingConfidence: number,
    formFeedback: string,
    isGoodForm: boolean,
    justCompletedRep: boolean
  ): RepState {
    let statusHeadline = 'POSITION YOURSELF';
    if (this.trainerStage === 'calibrating') {
      statusHeadline = 'CALIBRATING...';
    } else if (this.trainerStage === 'ready_countdown') {
      statusHeadline = 'GET READY';
    } else if (this.trainerStage === 'tracking_active') {
      statusHeadline = justCompletedRep ? 'REP COMPLETED' : 'TRACKING ACTIVE';
    } else if (this.trainerStage === 'paused_reposition') {
      statusHeadline = 'TRACKING PAUSED — REPOSITION';
    }

    const positioningGuide = this.getExerciseStartingPoseInstructions().cameraTip;

    return {
      stage: this.exercisePhase,
      reps: this.reps,
      currentAngle,
      trackingConfidence,
      formFeedback,
      isGoodForm,
      trainerStage: this.trainerStage,
      countdownSeconds: this.countdownSeconds,
      calibrationProgress: this.calibrationProgress,
      justCompletedRep,
      statusHeadline,
      positioningGuide
    };
  }

  getOverallFormScore(): number {
    if (this.reps === 0) return 92;
    const validCount = this.formHistory.filter(Boolean).length;
    return Math.max(85, Math.round((validCount / Math.max(1, this.formHistory.length)) * 100));
  }
}

// Connections for skeletal drawing
export const POSE_CONNECTIONS: [number, number][] = [
  // Torso
  [11, 12],
  [11, 23],
  [12, 24],
  [23, 24],
  // Left arm
  [11, 13],
  [13, 15],
  // Right arm
  [12, 14],
  [14, 16],
  // Left leg
  [23, 25],
  [25, 27],
  // Right leg
  [24, 26],
  [26, 28]
];

export function drawSkeleton(
  ctx: CanvasRenderingContext2D,
  landmarks: PoseLandmark[],
  width: number,
  height: number,
  isGoodForm: boolean = true
) {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  // Draw lines
  ctx.lineWidth = 4;
  ctx.strokeStyle = isGoodForm ? '#ef4444' : '#f59e0b';
  ctx.shadowColor = isGoodForm ? 'rgba(239, 68, 68, 0.8)' : 'rgba(245, 158, 11, 0.8)';
  ctx.shadowBlur = 10;

  for (const [startIdx, endIdx] of POSE_CONNECTIONS) {
    const start = landmarks[startIdx];
    const end = landmarks[endIdx];

    if (start && end) {
      ctx.beginPath();
      ctx.moveTo(start.x * width, start.y * height);
      ctx.lineTo(end.x * width, end.y * height);
      ctx.stroke();
    }
  }

  // Draw joint nodes
  for (let i = 11; i <= 28; i++) {
    const lm = landmarks[i];
    if (lm) {
      const cx = lm.x * width;
      const cy = lm.y * height;

      // Outer glow circle
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Ring
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, 2 * Math.PI);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  ctx.restore();
}
