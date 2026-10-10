import { Exercise } from '../types';

export const EXERCISES: Exercise[] = [
  // CHEST
  {
    id: 'chest_incline_db_press',
    name: 'Incline Dumbbell Press',
    muscleGroup: 'chest',
    targetMuscle: 'Upper Pectoralis Major (Clavicular Head)',
    secondaryMuscles: ['Anterior Deltoids', 'Triceps Brachii'],
    equipment: 'Incline Bench (30-45°), Dumbbells',
    difficulty: 'intermediate',
    instructions: [
      'Set bench to a 30-degree angle to bias clavicular fibers without excessive front delt takeover.',
      'Kick dumbbells to shoulder level and plant feet firmly into the floor.',
      'Retract scapulae and maintain a slight natural arch in the lower back.',
      'Lower weights under 3-second eccentric control until dumbbells reach upper chest height.',
      'Press upward in a slight converging arc, driving through the chest without clashing the weights.'
    ],
    suggestedSets: 4,
    suggestedReps: '8-10 reps',
    restSeconds: 90,
    breathingGuide: 'Inhale deeply on the eccentric descent; exhale forcefully through pursed lips past the sticking point.',
    commonMistakes: [
      'Setting bench angle too high (>45°), shifting load onto anterior deltoids.',
      'Bouncing dumbbells at the bottom or flaring elbows out at 90 degrees.',
      'Losing scapular retraction at the top lockout.'
    ],
    easierVariation: 'Incline Push-Up on Elevated Bench',
    harderVariation: 'Incline Dumbbell Press with 3-Second Isometric Bottom Pause',
    safetyNotes: 'Keep elbows tucked at roughly 45-60 degrees relative to your torso to protect the glenohumeral joint capsule.',
    recoveryHours: 48,
    cameraSupported: false
  },
  {
    id: 'chest_barbell_bench_press',
    name: 'Barbell Flat Bench Press',
    muscleGroup: 'chest',
    targetMuscle: 'Sternal & Clavicular Pectoralis Major',
    secondaryMuscles: ['Triceps Brachii', 'Anterior Deltoids', 'Serratus Anterior'],
    equipment: 'Olympic Barbell, Weight Plates, Flat Bench',
    difficulty: 'intermediate',
    instructions: [
      'Lie supine on bench with eyes directly under the bar.',
      'Grip the bar slightly wider than shoulder width with a full hook grip.',
      'Pull shoulder blades down and back, planting feet directly under or behind knees.',
      'Unrack with locked arms, pull bar down towards mid-to-lower sternum.',
      'Drive powerfully off the chest while driving heels through the floor.'
    ],
    suggestedSets: 4,
    suggestedReps: '6-8 reps',
    restSeconds: 120,
    breathingGuide: 'Brace core with Valsalva maneuver before descent; exhale as you push past mid-range.',
    commonMistakes: [
      'Flaring elbows perpendicular to torso, which causes subacromial impingement.',
      'Lifting glutes off the bench to cheat the lockout.',
      'Dropping bar violently onto sternum.'
    ],
    easierVariation: 'Dumbbell Flat Press with Neutral Grip',
    harderVariation: 'Pause Bench Press (2-second dead stop on sternum)',
    safetyNotes: 'Always use safety spotter arms or a reliable human spotter when testing heavy loads.',
    recoveryHours: 72,
    cameraSupported: false
  },
  {
    id: 'chest_pushup_camera',
    name: 'Standard Push-Up (AI Tracked)',
    muscleGroup: 'chest',
    targetMuscle: 'Pectoralis Major & Core Stabilizers',
    secondaryMuscles: ['Triceps Brachii', 'Anterior Deltoids', 'Rectus Abdominis'],
    equipment: 'Bodyweight / Floor Mat',
    difficulty: 'beginner',
    instructions: [
      'Position hands just outside shoulder-width on the floor.',
      'Form a rigid plank from head to heels with glutes and abs contracted.',
      'Lower chest towards floor until elbows bend to 90 degrees or chest grazes ground.',
      'Press the floor away until arms reach full extension without locking out harshly.'
    ],
    suggestedSets: 3,
    suggestedReps: '12-15 reps',
    restSeconds: 60,
    breathingGuide: 'Inhale during descent; exhale as you push away from the ground.',
    commonMistakes: [
      'Sagging hips or piking glutes into the air.',
      'Only doing half-reps without full range of motion.',
      'Craning neck forward toward the ground.'
    ],
    easierVariation: 'Knee Push-Ups or Hands-Elevated Push-Ups',
    harderVariation: 'Feet-Elevated Decline Push-Ups or Deficit Push-Ups',
    safetyNotes: 'Maintain neutral cervical spine; keep gaze looking slightly ahead on the floor.',
    recoveryHours: 36,
    cameraSupported: true,
    supportedAiType: 'pushup'
  },
  {
    id: 'chest_cable_crossover',
    name: 'Standing Cable Fly / Crossover',
    muscleGroup: 'chest',
    targetMuscle: 'Inner & Sternal Pectoralis Fibers',
    secondaryMuscles: ['Anterior Deltoids', 'Biceps Short Head'],
    equipment: 'Cable Tower / Pulleys',
    difficulty: 'intermediate',
    instructions: [
      'Set pulleys at shoulder or high level and grab single D-handles.',
      'Step forward into a staggered stance with chest high and slight forward torso lean.',
      'Keep a slight fixed bend in elbows throughout the movement.',
      'Bring hands together in a wide hugging arc, squeezing pecs hard at peak contraction.'
    ],
    suggestedSets: 3,
    suggestedReps: '12-15 reps',
    restSeconds: 60,
    breathingGuide: 'Inhale on the wide stretch; exhale on the deep contraction.',
    commonMistakes: [
      'Turning the fly into a press by excessively bending and extending elbows.',
      'Using momentum and swaying torso.',
      'Allowing shoulders to roll forward at the stretch.'
    ],
    easierVariation: 'Pec Deck Machine Fly',
    harderVariation: 'Cable Fly with 2-Second Peak Contraction and Cross-Over Grip',
    safetyNotes: 'Do not hyperextend shoulder capsules beyond comfortable passive horizontal abduction.',
    recoveryHours: 48,
    cameraSupported: false
  },

  // BACK
  {
    id: 'back_barbell_deadlift',
    name: 'Conventional Barbell Deadlift',
    muscleGroup: 'back',
    targetMuscle: 'Erector Spinae & Latissimus Dorsi',
    secondaryMuscles: ['Hamstrings', 'Gluteus Maximus', 'Trapezius', 'Forearms'],
    equipment: 'Olympic Barbell, Bumper/Iron Plates',
    difficulty: 'advanced',
    instructions: [
      'Stand with feet hip-width apart, barbell cutting across mid-foot.',
      'Hinge at hips, grip bar with double overhand or mixed grip just outside shins.',
      'Pull chest up, pull slack out of the barbell, engage lats like bending the bar.',
      'Drive through mid-foot and floor, extending knees and hips simultaneously to lockout.'
    ],
    suggestedSets: 4,
    suggestedReps: '5 reps',
    restSeconds: 150,
    breathingGuide: 'Deep diaphragmatic breath into 360-degree belt brace before pull; exhale past lockout.',
    commonMistakes: [
      'Rounding lumbar spine during the initial pull from floor.',
      'Bar drifting away from shins, creating massive shear stress on lower back.',
      'Hyper-extending lower back at the top.'
    ],
    easierVariation: 'Trap Bar Deadlift or Romanian Deadlift from Blocks',
    harderVariation: 'Deficit Deadlift (standing on 2-inch platform)',
    safetyNotes: 'Stop set if spinal neutrality breaks down. Deadlifts require pristine mechanical integrity.',
    recoveryHours: 96,
    cameraSupported: false
  },
  {
    id: 'back_lat_pulldown',
    name: 'Wide-Grip Lat Pulldown',
    muscleGroup: 'back',
    targetMuscle: 'Latissimus Dorsi (Outer Flare)',
    secondaryMuscles: ['Biceps Brachii', 'Brachialis', 'Teres Major', 'Rhomboids'],
    equipment: 'Cable Lat Pulldown Station, Wide Lat Bar',
    difficulty: 'beginner',
    instructions: [
      'Adjust thigh pad snug against knees with feet flat on the floor.',
      'Take an overhand grip slightly wider than shoulder width.',
      'Retract scapulae downwards before initiating the pull with elbows.',
      'Pull bar down to upper chest while keeping slight 10-15° torso lean.',
      'Control the return for a full lat stretch at the top.'
    ],
    suggestedSets: 4,
    suggestedReps: '10-12 reps',
    restSeconds: 75,
    breathingGuide: 'Exhale driving elbows down to your pockets; inhale as the bar returns to top.',
    commonMistakes: [
      'Swinging torso backwards 45 degrees to use bodyweight momentum.',
      'Pulling bar behind neck, stressing cervical spine and rotator cuffs.',
      'Gripping too wide, cutting active range of motion.'
    ],
    easierVariation: 'Resistance Band Lat Pulldowns',
    harderVariation: 'Full Bodyweight Pull-Ups with Dead Hang',
    safetyNotes: 'Always pull bar to front upper chest level.',
    recoveryHours: 48,
    cameraSupported: false
  },
  {
    id: 'back_chest_supported_row',
    name: 'Chest-Supported T-Bar / DB Row',
    muscleGroup: 'back',
    targetMuscle: 'Rhomboids, Middle Trapezius & Lats',
    secondaryMuscles: ['Rear Deltoids', 'Biceps', 'Brachioradialis'],
    equipment: 'Incline Bench or T-Bar Row Machine, Dumbbells',
    difficulty: 'intermediate',
    instructions: [
      'Lie face down on an incline bench set to 30-40 degrees.',
      'Hold dumbbells with neutral or overhand grip, arms hanging straight.',
      'Drive elbows back towards your hips, squeezing shoulder blades together.',
      'Hold peak squeeze for 1 second, then lower under 2-3 second control.'
    ],
    suggestedSets: 4,
    suggestedReps: '8-10 reps',
    restSeconds: 90,
    breathingGuide: 'Exhale on row contraction; inhale fully as arms reach down.',
    commonMistakes: [
      'Lifting chest off the pad to cheat load.',
      'Shrugging shoulders into the ears instead of retracting back and down.',
      'Using bicep momentum rather than back retraction.'
    ],
    easierVariation: 'Seated Cable Row with Neutral V-Grip',
    harderVariation: 'Bent-Over Pendlay Barbell Row',
    safetyNotes: 'Chest support eliminates lower-back shear force, making this ideal for spinal sparing.',
    recoveryHours: 48,
    cameraSupported: false
  },
  {
    id: 'back_seated_cable_row',
    name: 'Seated Cable Low Row',
    muscleGroup: 'back',
    targetMuscle: 'Mid-Back Thickness (Rhomboids & Lower Traps)',
    secondaryMuscles: ['Latissimus Dorsi', 'Posterior Deltoids', 'Biceps'],
    equipment: 'Seated Cable Row Station, Close-Grip V-Bar',
    difficulty: 'beginner',
    instructions: [
      'Sit on bench, place feet on footrests with soft bend in knees.',
      'Grasp handle, sit upright with spine neutral and chest proud.',
      'Pull handle toward belly button, tucking elbows close to ribcage.',
      'Pause for 1 second squeeze; return slowly without rounding back.'
    ],
    suggestedSets: 3,
    suggestedReps: '10-12 reps',
    restSeconds: 60,
    breathingGuide: 'Inhale extending arms forward; exhale as you draw the weight into your torso.',
    commonMistakes: [
      'Rocking back and forth excessively with hips.',
      'Rounding lumbar spine at full arm extension.',
      'Failing to retract scapulae at the end of the pull.'
    ],
    easierVariation: 'Single-Arm Cable Row with Light Load',
    harderVariation: 'Single-Arm Dumbbell Row on Flat Bench',
    safetyNotes: 'Keep knees soft to protect lower back and hamstrings from strain.',
    recoveryHours: 48,
    cameraSupported: false
  },

  // LEGS
  {
    id: 'legs_bodyweight_squat_camera',
    name: 'Bodyweight Squat (AI Tracked)',
    muscleGroup: 'legs',
    targetMuscle: 'Quadriceps, Gluteus Maximus & Adductors',
    secondaryMuscles: ['Hamstrings', 'Calves', 'Core Stabilizers'],
    equipment: 'Bodyweight / AI Camera',
    difficulty: 'beginner',
    instructions: [
      'Stand feet shoulder-width apart, toes slightly turned out (15-30°).',
      'Look straight ahead, keep chest up and core braced.',
      'Initiate movement by hinging hips back and bending knees simultaneously.',
      'Descend until thighs are parallel to or slightly below knee crease.',
      'Drive through full foot to stand up tall, squeezing glutes at top.'
    ],
    suggestedSets: 4,
    suggestedReps: '12-15 reps',
    restSeconds: 60,
    breathingGuide: 'Inhale on the descent; exhale forcefully driving back up to starting stance.',
    commonMistakes: [
      'Knees caving inward (valgus collapse) on descent or ascent.',
      'Heels lifting off the ground, placing excessive shear on patella.',
      'Cutting depth short before parallel.'
    ],
    easierVariation: 'Box Squat onto Bench',
    harderVariation: 'Barbell Back Squat or Bulgarian Split Squat',
    safetyNotes: 'Keep weight distributed across the mid-foot tripod: heel, base of big toe, base of pinky toe.',
    recoveryHours: 48,
    cameraSupported: true,
    supportedAiType: 'squat'
  },
  {
    id: 'legs_barbell_back_squat',
    name: 'Barbell High-Bar Back Squat',
    muscleGroup: 'legs',
    targetMuscle: 'Quadriceps (Vastus Medialis/Lateralis/Intermedius)',
    secondaryMuscles: ['Gluteus Maximus', 'Adductor Magnus', 'Spinal Erectors'],
    equipment: 'Squat Rack, Olympic Barbell, Plates',
    difficulty: 'advanced',
    instructions: [
      'Step under bar, rest it across upper trapezius muscles.',
      'Unrack with tall posture, take 2-3 calculated steps back.',
      'Take deep breath, expand abdominal cylinder against weightlifting belt.',
      'Descend into hole with control, maintaining upright torso.',
      'Explode out of hole maintaining knee alignment tracking over toes.'
    ],
    suggestedSets: 4,
    suggestedReps: '6-8 reps',
    restSeconds: 120,
    breathingGuide: 'Take deep 360° breath at top, hold intra-abdominal pressure down, exhale near top of ascent.',
    commonMistakes: [
      'Collapsing chest forward into a "good morning" squat.',
      'Bouncing out of knee lockout.',
      'Under-squatting quarter reps.'
    ],
    easierVariation: 'Goblet Squat with Heavy Kettlebell',
    harderVariation: 'Pause Squats with 3-Second Dead Stop in the Hole',
    safetyNotes: 'Set safety pins right below your bottom depth so you can dump the bar safely if stuck.',
    recoveryHours: 72,
    cameraSupported: false
  },
  {
    id: 'legs_walking_lunges_camera',
    name: 'Walking Bodyweight Lunge (AI Tracked)',
    muscleGroup: 'legs',
    targetMuscle: 'Glutes, Quads & Hamstrings',
    secondaryMuscles: ['Calves', 'Core & Balance Stabilizers'],
    equipment: 'Bodyweight / AI Camera',
    difficulty: 'beginner',
    instructions: [
      'Stand tall with hands on hips or at chest.',
      'Take a comfortable forward step, lowering hips until both knees form roughly 90-degree angles.',
      'Keep front knee tracking in line with second toe, rear knee just hovering over floor.',
      'Push off front heel and rear toe to step through into next repetition.'
    ],
    suggestedSets: 3,
    suggestedReps: '10-12 reps per leg',
    restSeconds: 60,
    breathingGuide: 'Inhale descending into lunge; exhale pushing through front foot to return/advance.',
    commonMistakes: [
      'Front knee drifting excessively past toes without heel contact.',
      'Torso collapsing forward instead of staying tall and proud.',
      'Banging rear kneecap onto hard floor.'
    ],
    easierVariation: 'Static Split Squat with Hand on Wall Support',
    harderVariation: 'Walking Dumbbell Lunges or Deficit Reverse Lunges',
    safetyNotes: 'Keep hips square and avoid letting the front knee buckle inward.',
    recoveryHours: 48,
    cameraSupported: true,
    supportedAiType: 'lunge'
  },
  {
    id: 'legs_romanian_deadlift',
    name: 'Dumbbell Romanian Deadlift (RDL)',
    muscleGroup: 'legs',
    targetMuscle: 'Hamstrings (Biceps Femoris) & Gluteal Fold',
    secondaryMuscles: ['Erector Spinae', 'Adductors', 'Trapezius'],
    equipment: 'Pair of Heavy Dumbbells',
    difficulty: 'intermediate',
    instructions: [
      'Hold dumbbells in front of thighs with slight bend in knees.',
      'Hinge hips backwards as if trying to touch the wall behind you with glutes.',
      'Keep dumbbells skimming down front of thighs and shins.',
      'Stop when you feel intense hamstring stretch (usually mid-shin level).',
      'Contract glutes and hamstrings to drive hips back forward to starting position.'
    ],
    suggestedSets: 4,
    suggestedReps: '8-10 reps',
    restSeconds: 90,
    breathingGuide: 'Inhale on the posterior hip hinge; exhale as hips lock out forward.',
    commonMistakes: [
      'Bending knees into a squat instead of hinging backwards.',
      'Rounding the lower back to lower the dumbbells lower to the floor.',
      'Letting weights drift away from legs.'
    ],
    easierVariation: 'Cable Pull-Through',
    harderVariation: 'Single-Leg Romanian Deadlift with Kettlebell',
    safetyNotes: 'Keep knees soft (15-20 degrees bend) and locked in place; movement occurs strictly at hips.',
    recoveryHours: 72,
    cameraSupported: false
  },

  // SHOULDERS
  {
    id: 'shoulders_db_overhead_press',
    name: 'Seated Dumbbell Overhead Press',
    muscleGroup: 'shoulders',
    targetMuscle: 'Anterior & Medial Deltoids',
    secondaryMuscles: ['Triceps Brachii', 'Upper Trapezius', 'Serratus Anterior'],
    equipment: 'Adjustable Bench (75-85°), Pair of Dumbbells',
    difficulty: 'intermediate',
    instructions: [
      'Sit on upright bench with back supported, holding dumbbells at shoulder level.',
      'Palms facing forward or slightly angled in (scapular plane ~30°).',
      'Press dumbbells overhead until arms are extended but not hyperextended.',
      'Lower weights under control back to ear level for full stretch.'
    ],
    suggestedSets: 4,
    suggestedReps: '8-10 reps',
    restSeconds: 90,
    breathingGuide: 'Inhale at bottom; exhale as dumbbells drive overhead.',
    commonMistakes: [
      'Excessively arching lower back to turn the press into an incline bench press.',
      'Banging dumbbells together violently at top.',
      'Cutting bottom range of motion by stopping well above ear level.'
    ],
    easierVariation: 'Standing Arnold Press with Light Weights',
    harderVariation: 'Standing Overhead Barbell Military Press',
    safetyNotes: 'Pressing in the scapular plane prevents shoulder impingement.',
    recoveryHours: 48,
    cameraSupported: false
  },
  {
    id: 'shoulders_lateral_raises',
    name: 'Dumbbell Side Lateral Raises',
    muscleGroup: 'shoulders',
    targetMuscle: 'Lateral Deltoids (Side Cap Width)',
    secondaryMuscles: ['Supraspinatus', 'Upper Trapezius'],
    equipment: 'Light-to-Moderate Dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Stand feet shoulder-width, slight forward hinge of torso (10 degrees).',
      'Hold dumbbells at sides with slight natural bend at elbows.',
      'Raise arms out to sides leading with elbows until parallel with floor.',
      'Pause at apex for half second, then lower under 2-3 second control.'
    ],
    suggestedSets: 4,
    suggestedReps: '12-15 reps',
    restSeconds: 60,
    breathingGuide: 'Exhale raising dumbbells; inhale lowering back down.',
    commonMistakes: [
      'Using heavy weights and swinging hips/legs for momentum.',
      'Shrugging traps up to neck instead of abducting with lateral delts.',
      'Raising hands higher than elbows (internal rotation danger).'
    ],
    easierVariation: 'Single-Arm Cable Lateral Raise',
    harderVariation: 'Egyptian Cable Lateral Raise with Constant Tension',
    safetyNotes: 'Do not raise dumbbells above shoulder height to prevent impingement.',
    recoveryHours: 36,
    cameraSupported: false
  },
  {
    id: 'shoulders_face_pull',
    name: 'Cable Face Pull with External Rotation',
    muscleGroup: 'shoulders',
    targetMuscle: 'Posterior Deltoids & Infraspinatus',
    secondaryMuscles: ['Rhomboids', 'Middle/Lower Trapezius', 'Teres Minor'],
    equipment: 'Cable Machine, Rope Attachment',
    difficulty: 'beginner',
    instructions: [
      'Set pulley to upper chest or eye level with rope attachment.',
      'Grip rope ends with thumbs pointing back towards you.',
      'Step back, pull rope directly towards bridge of nose.',
      'Externally rotate shoulders at the finish, spreading rope apart.',
      'Squeeze rear delts and upper back before returning with control.'
    ],
    suggestedSets: 4,
    suggestedReps: '15 reps',
    restSeconds: 60,
    breathingGuide: 'Exhale pulling and separating rope; inhale extending arms forward.',
    commonMistakes: [
      'Using too much weight and jerking torso backward.',
      'Pulling down to chest like a row instead of high to face.',
      'Failing to externally rotate at top.'
    ],
    easierVariation: 'Resistance Band Face Pulls',
    harderVariation: 'Chest-Supported Rear Delt Dumbbell Flyes',
    safetyNotes: 'Essential bulletproofing exercise for rotator cuff and postural longevity.',
    recoveryHours: 36,
    cameraSupported: false
  },

  // BICEPS
  {
    id: 'biceps_standing_curl_camera',
    name: 'Standing Biceps Curl (AI Tracked)',
    muscleGroup: 'biceps',
    targetMuscle: 'Biceps Brachii (Short & Long Head)',
    secondaryMuscles: ['Brachialis', 'Brachioradialis'],
    equipment: 'Dumbbells / AI Camera',
    difficulty: 'beginner',
    instructions: [
      'Stand tall with feet hip-width apart, holding weights at sides.',
      'Pin elbows firmly to your ribcage; do not let them drift forward or back.',
      'Curl the weights upward while supinating wrists (palms facing up).',
      'Squeeze biceps peak intensely at the top.',
      'Lower weights smoothly through full extension without swinging.'
    ],
    suggestedSets: 3,
    suggestedReps: '10-12 reps',
    restSeconds: 60,
    breathingGuide: 'Exhale curling up; inhale lowering weights under control.',
    commonMistakes: [
      'Swinging lower back to heave heavy dumbbells.',
      'Drifting elbows forward, recruiting anterior deltoids.',
      'Stopping short before full elbow extension.'
    ],
    easierVariation: 'Seated Incline Dumbbell Curl',
    harderVariation: 'Preacher Curl or 21s Biceps Curl Protocol',
    safetyNotes: 'Keep wrists firm and neutral; do not bend wrists back excessively.',
    recoveryHours: 36,
    cameraSupported: true,
    supportedAiType: 'bicep_curl'
  },
  {
    id: 'biceps_hammer_curl',
    name: 'Cross-Body / Neutral Hammer Curl',
    muscleGroup: 'biceps',
    targetMuscle: 'Brachialis & Brachioradialis',
    secondaryMuscles: ['Biceps Brachii Long Head'],
    equipment: 'Pair of Dumbbells',
    difficulty: 'beginner',
    instructions: [
      'Hold dumbbells with neutral grip (palms facing each other).',
      'Keep elbows locked against sides.',
      'Curl dumbbells straight up towards shoulders while maintaining neutral thumbs-up grip.',
      'Hold peak squeeze for 1 count, lower under controlled tempo.'
    ],
    suggestedSets: 4,
    suggestedReps: '10-12 reps',
    restSeconds: 60,
    breathingGuide: 'Exhale as you curl up; inhale as you lower the weight.',
    commonMistakes: [
      'Rotating wrists into supination, defeating the brachialis focus.',
      'Using torso swinging motion.',
      'Moving both elbows forward off ribs.'
    ],
    easierVariation: 'Rope Cable Hammer Curl',
    harderVariation: 'Heavy Incline Bench Hammer Curl',
    safetyNotes: 'Builds arm thickness and protects elbow tendon health.',
    recoveryHours: 36,
    cameraSupported: false
  },

  // TRICEPS
  {
    id: 'triceps_rope_pushdown',
    name: 'Cable Triceps Rope Pushdown',
    muscleGroup: 'triceps',
    targetMuscle: 'Triceps Brachii Lateral & Medial Head',
    secondaryMuscles: ['Anconeus'],
    equipment: 'Cable Tower, Rope Attachment',
    difficulty: 'beginner',
    instructions: [
      'Attach rope to high pulley; grip near bottom rubber stoppers.',
      'Stand with slight torso hinge, elbows pinned tightly to sides.',
      'Extend arms downward, spreading rope ends apart at the bottom lockout.',
      'Squeeze triceps forcefully, then allow forearms to travel up to 90 degrees.'
    ],
    suggestedSets: 4,
    suggestedReps: '12-15 reps',
    restSeconds: 60,
    breathingGuide: 'Exhale pressing down and locking out; inhale returning up.',
    commonMistakes: [
      'Letting elbows flare out or drift up towards shoulders.',
      'Leaning too far forward over the rope to use bodyweight.',
      'Not spreading the rope at the bottom lockout.'
    ],
    easierVariation: 'Straight Bar Cable Pushdown',
    harderVariation: 'Overhead Cable Triceps Extension',
    safetyNotes: 'Keep wrists locked straight; do not flick wrists down.',
    recoveryHours: 36,
    cameraSupported: false
  },
  {
    id: 'triceps_skull_crushers',
    name: 'EZ-Bar Lying Triceps Extension (Skull Crushers)',
    muscleGroup: 'triceps',
    targetMuscle: 'Triceps Long Head & Medial Head',
    secondaryMuscles: ['Anconeus'],
    equipment: 'Flat Bench, EZ Curl Bar',
    difficulty: 'intermediate',
    instructions: [
      'Lie on flat bench holding EZ bar with narrow overhand grip above chest.',
      'Angle upper arms back roughly 10-15 degrees behind vertical.',
      'Bending only at elbows, lower bar towards forehead or crown of head.',
      'Drive bar back up along same arc to lockout, squeezing triceps.'
    ],
    suggestedSets: 3,
    suggestedReps: '10-12 reps',
    restSeconds: 75,
    breathingGuide: 'Inhale lowering bar towards crown; exhale extending back up.',
    commonMistakes: [
      'Flaring elbows out laterally like chicken wings.',
      'Moving upper arms back and forth like a pullover.',
      'Dropping bar carelessly near forehead.'
    ],
    easierVariation: 'Dumbbell Neutral-Grip Skull Crushers',
    harderVariation: 'Incline Bench EZ Bar Skull Crushers to Behind Head',
    safetyNotes: 'Angling upper arms slightly back places continuous tension on triceps long head and reduces direct elbow torque.',
    recoveryHours: 48,
    cameraSupported: false
  },

  // ABS & CORE
  {
    id: 'abs_hanging_leg_raise',
    name: 'Hanging Knee / Leg Raise',
    muscleGroup: 'abs',
    targetMuscle: 'Lower Rectus Abdominis & Ilio-psoas',
    secondaryMuscles: ['Obliques', 'Forearm Flexors / Grip'],
    equipment: 'Pull-Up Bar or Captain\'s Chair',
    difficulty: 'intermediate',
    instructions: [
      'Hang from bar with overhand grip and engaged shoulders.',
      'Posteriorly tilt pelvis and draw knees up towards chest.',
      'To hit abs rather than hip flexors, curl your pelvis upward at the top.',
      'Lower legs under strict control without swinging or using momentum.'
    ],
    suggestedSets: 3,
    suggestedReps: '12-15 reps',
    restSeconds: 60,
    breathingGuide: 'Exhale forcefully as knees rise and pelvis curls; inhale lowering.',
    commonMistakes: [
      'Swinging legs like a pendulum.',
      'Only moving thighs without curling pelvis, missing the rectus abdominis.',
      'Arching lower back when hanging.'
    ],
    easierVariation: 'Captain\'s Chair Supported Knee Raise',
    harderVariation: 'Toes-to-Bar with Straight Legs',
    safetyNotes: 'Keep core tight on descent to avoid hyperextending lumbar spine.',
    recoveryHours: 24,
    cameraSupported: false
  },
  {
    id: 'abs_cable_woodchopper',
    name: 'Cable High-to-Low Woodchopper',
    muscleGroup: 'abs',
    targetMuscle: 'Internal & External Obliques',
    secondaryMuscles: ['Transverse Abdominis', 'Shoulders'],
    equipment: 'Cable Tower, Single Handle',
    difficulty: 'intermediate',
    instructions: [
      'Set cable handle at high position, stand sideways to machine.',
      'Hold handle with both hands, arms straight with slight elbow bend.',
      'Rotate torso diagonally downward across body toward opposite hip.',
      'Pivot on rear foot and engage obliques throughout the rotation.',
      'Return to start under controlled eccentric resistance.'
    ],
    suggestedSets: 3,
    suggestedReps: '12 reps per side',
    restSeconds: 45,
    breathingGuide: 'Exhale on the diagonal downward chop; inhale returning up.',
    commonMistakes: [
      'Bending arms and pulling with biceps instead of rotating from trunk.',
      'Letting hips lock without pivoting the back foot.',
      'Rushing the negative phase.'
    ],
    easierVariation: 'Resistance Band Diagonal Chops',
    harderVariation: 'Standing Landmine Rotations with Barbell',
    safetyNotes: 'Rotate through thoracic spine and hips; avoid twisting with locked lower spine.',
    recoveryHours: 24,
    cameraSupported: false
  }
];
