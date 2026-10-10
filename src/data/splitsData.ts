import { BodybuilderSplit } from '../types';

export const BODYBUILDER_SPLITS: BodybuilderSplit[] = [
  {
    id: 'arnold_golden_era_split',
    name: 'Arnold Schwarzenegger: Golden Era High Volume Antagonist Split',
    legend: 'Arnold Schwarzenegger (7x Mr. Olympia)',
    phase: 'bulking',
    daysPerWeek: 6,
    frequencyType: '6 Days On / 1 Day Rest (Double Split Frequency)',
    philosophy: 'Super-setting opposing muscle groups (Chest & Back, Biceps & Triceps) creates skin-splitting pumps, promotes antagonist circulation, and sparks supreme hypertrophy.',
    days: [
      {
        dayLabel: 'Day 1 & Day 4',
        focus: 'Chest & Back (Antagonist Supersets)',
        exercises: [
          { name: 'Flat Barbell Bench Press + Wide-Grip Chin-Ups', sets: '5 sets', reps: '10-12 reps', rest: '75s', notes: 'Perform in alternating supersets with strict bar-to-chest form.' },
          { name: 'Incline Barbell Press + Bent-Over Barbell Rows', sets: '4 sets', reps: '8-10 reps', rest: '90s', notes: 'Heavy mechanical tension with scapular retraction.' },
          { name: 'Dumbbell Flyes + Cable Seated Rows', sets: '4 sets', reps: '12-15 reps', rest: '60s', notes: 'Maximum deep stretch on pecs and peak squeeze on lats.' },
          { name: 'Dumbbell Pullovers across Flat Bench', sets: '4 sets', reps: '15 reps', rest: '60s', notes: 'Expand ribcage and load serratus anterior.' }
        ]
      },
      {
        dayLabel: 'Day 2 & Day 5',
        focus: 'Shoulders & Arms (High Volume Bi/Tri Blast)',
        exercises: [
          { name: 'Seated Dumbbell Overhead Press (Arnold Press)', sets: '5 sets', reps: '8-10 reps', rest: '90s', notes: 'Rotate wrists from supination to pronation during ascent.' },
          { name: 'Standing Lateral Raises + Rear Delt Flyes', sets: '4 sets', reps: '12-15 reps', rest: '60s', notes: 'Isolate medial and posterior deltoid heads.' },
          { name: 'Standing Barbell Biceps Curls + Skull Crushers', sets: '4 sets', reps: '10-12 reps', rest: '75s', notes: 'Superset for complete upper arm blood volumization.' },
          { name: 'Incline Dumbbell Curls + Triceps Cable Pushdowns', sets: '4 sets', reps: '12 reps', rest: '60s', notes: 'Deep stretch on long head of biceps.' }
        ]
      },
      {
        dayLabel: 'Day 3 & Day 6',
        focus: 'Legs & Lower Back (Calves & Hamstrings Focus)',
        exercises: [
          { name: 'Barbell High-Bar Back Squats', sets: '5 sets', reps: '8-12 reps', rest: '120s', notes: 'Full depth in the hole, explosive concentric ascent.' },
          { name: 'Straight-Leg Romanian Deadlifts', sets: '4 sets', reps: '10 reps', rest: '90s', notes: 'Feel immense hamstring hamstring loading.' },
          { name: 'Leg Extensions + Seated Hamstring Curls', sets: '4 sets', reps: '15 reps', rest: '60s', notes: 'Pump quadriceps and knee flexors to failure.' },
          { name: 'Standing Donkey / Machine Calf Raises', sets: '5 sets', reps: '15-20 reps', rest: '45s', notes: '2-second pause at bottom stretch on each rep.' }
        ]
      },
      {
        dayLabel: 'Day 7',
        focus: 'Active Recovery & Tissue Regeneration',
        exercises: [
          { name: 'Low Intensity Cardio & Contrast Shower', sets: '1 session', reps: '30 mins', rest: 'N/A', notes: 'Flush metabolic waste and refuel with high protein & complex carbs.' }
        ]
      }
    ]
  },
  {
    id: 'ronnie_coleman_heavy_duty',
    name: 'Ronnie Coleman: "Yeah Buddy" Heavy Power-Hypertrophy Split',
    legend: 'Ronnie Coleman (8x Mr. Olympia)',
    phase: 'bulking',
    daysPerWeek: 6,
    frequencyType: 'Push / Pull / Legs (2x Frequency Weekly)',
    philosophy: 'Train heavy, train hard. Progressive overload using compound staples with legendary work ethic: "Everybody wants to be a bodybuilder, but nobody wants to lift no heavy-ass weights!"',
    days: [
      {
        dayLabel: 'Day 1 & Day 4',
        focus: 'Back & Biceps (Brutal Thickness)',
        exercises: [
          { name: 'Conventional Barbell Deadlifts', sets: '4 sets', reps: '6-8 reps', rest: '150s', notes: 'Heavy power pulling off floor with locked core.' },
          { name: 'Barbell Bent-Over Rows', sets: '4 sets', reps: '8-10 reps', rest: '90s', notes: 'Explosive pull to belly button.' },
          { name: 'Wide Lat Pulldowns to Sternum', sets: '4 sets', reps: '10-12 reps', rest: '75s', notes: 'Maximum lat flare.' },
          { name: 'Standing Alternate Dumbbell Curls', sets: '4 sets', reps: '10 reps', rest: '60s', notes: 'Heavy curls with strict negative.' }
        ]
      },
      {
        dayLabel: 'Day 2 & Day 5',
        focus: 'Chest & Triceps (Heavy Pushing)',
        exercises: [
          { name: 'Barbell Flat Bench Press', sets: '4 sets', reps: '6-8 reps', rest: '120s', notes: 'Heavy pyramid sets increasing weight each round.' },
          { name: 'Incline Dumbbell Press', sets: '4 sets', reps: '8-10 reps', rest: '90s', notes: 'Dense upper chest fiber stimulation.' },
          { name: 'Parallel Bar Weighted Dips', sets: '3 sets', reps: '10 reps', rest: '75s', notes: 'Forward lean to load lower pectorals.' },
          { name: 'Close-Grip Bench Press or Cable Pushdowns', sets: '4 sets', reps: '10-12 reps', rest: '60s', notes: 'Lockout triceps under maximal tension.' }
        ]
      },
      {
        dayLabel: 'Day 3 & Day 6',
        focus: 'Legs & Deltoids (Pillar Strength)',
        exercises: [
          { name: 'Heavy Barbell Back Squats', sets: '5 sets', reps: '6-10 reps', rest: '150s', notes: 'Uncompromising depth and quad dominance.' },
          { name: '45-Degree Incline Leg Press', sets: '4 sets', reps: '12-15 reps', rest: '90s', notes: 'Continuous tension without knee hyperextension.' },
          { name: 'Seated Military Dumbbell Shoulder Press', sets: '4 sets', reps: '8-10 reps', rest: '90s', notes: 'Boulder delts foundation.' },
          { name: 'Side Lateral Cable Raises', sets: '4 sets', reps: '15 reps', rest: '60s', notes: 'Pure lateral head burn.' }
        ]
      },
      {
        dayLabel: 'Day 7',
        focus: 'Complete Rest & Massive Nutrition Re-feed',
        exercises: [
          { name: 'Anabolic Nutrition & Sleep', sets: '1 day', reps: '8-9h sleep', rest: 'N/A', notes: 'High protein consumption and rest for central nervous system.' }
        ]
      }
    ]
  },
  {
    id: 'cbum_classic_physique',
    name: 'Chris Bumstead: Classic Physique Aesthetic Mastery Split',
    legend: 'Chris Bumstead (5x Classic Physique Olympia)',
    phase: 'cutting',
    daysPerWeek: 5,
    frequencyType: '5-Day Hypertrophy & Density Protocol',
    philosophy: 'Emphasis on aesthetic proportion: V-taper lat width, wide lateral deltoids, small waist, and sweeping quad teardrops with high mechanical tension and strict biomechanics.',
    days: [
      {
        dayLabel: 'Day 1',
        focus: 'Legs (Quad Dominant Sweep)',
        exercises: [
          { name: 'Heels-Elevated Hack Squat', sets: '4 sets', reps: '8-10 reps', rest: '120s', notes: 'Ass-to-grass depth for maximum vastus medialis loading.' },
          { name: 'Walking Dumbbell Lunges', sets: '3 sets', reps: '12 steps/leg', rest: '90s', notes: 'Unilateral quad balance and glute stability.' },
          { name: 'Lying Hamstring Leg Curls', sets: '4 sets', reps: '10-12 reps', rest: '60s', notes: 'Slow 3-second negative.' },
          { name: 'Standing Calf Machine Raises', sets: '4 sets', reps: '15 reps', rest: '45s', notes: 'Deep stretch at bottom.' }
        ]
      },
      {
        dayLabel: 'Day 2',
        focus: 'Chest & Calves (Upper Pec Bias)',
        exercises: [
          { name: 'Incline Smith Machine Press (30°)', sets: '4 sets', reps: '8-10 reps', rest: '90s', notes: 'Controlled eccentric tempo, focus on clavicular pec fibers.' },
          { name: 'Flat Dumbbell Neutral Press', sets: '3 sets', reps: '10-12 reps', rest: '75s', notes: 'Great shoulder-friendly chest stretch.' },
          { name: 'Cable Incline Flyes with Iso-Hold', sets: '3 sets', reps: '12-15 reps', rest: '60s', notes: '1-second squeeze at midline peak.' }
        ]
      },
      {
        dayLabel: 'Day 3',
        focus: 'Back & Rear Delts (V-Taper Lat Flare)',
        exercises: [
          { name: 'Chest-Supported Row with Neutral Handles', sets: '4 sets', reps: '8-10 reps', rest: '90s', notes: 'Drive elbows back low to activate lats.' },
          { name: 'Neutral-Grip Lat Pulldown', sets: '4 sets', reps: '10-12 reps', rest: '75s', notes: 'Feel lats open up at top stretch.' },
          { name: 'Cable Rope Face Pulls', sets: '4 sets', reps: '15 reps', rest: '60s', notes: 'Rear delt and rotator cuff longevity.' }
        ]
      },
      {
        dayLabel: 'Day 4',
        focus: 'Shoulders & Triceps (Capped Deltoids)',
        exercises: [
          { name: 'Dumbbell Seated Overhead Press', sets: '4 sets', reps: '8-10 reps', rest: '90s', notes: 'Keep elbows slightly in front of torso.' },
          { name: 'Cable Lateral Raise (Behind Back)', sets: '4 sets', reps: '12-15 reps', rest: '60s', notes: 'Continuous resistance curve on medial delts.' },
          { name: 'Overhead Cable Triceps Rope Extension', sets: '4 sets', reps: '12 reps', rest: '60s', notes: 'Isolate triceps long head.' }
        ]
      },
      {
        dayLabel: 'Day 5',
        focus: 'Hamstrings & Arms Density',
        exercises: [
          { name: 'Romanian Dumbbell Deadlifts', sets: '4 sets', reps: '8-10 reps', rest: '90s', notes: 'Posterior hinge keeping lats tight.' },
          { name: 'Incline Dumbbell Bicep Curls', sets: '4 sets', reps: '10-12 reps', rest: '60s', notes: 'Great stretch on biceps peak.' },
          { name: 'Triceps Straight-Bar Pushdowns', sets: '4 sets', reps: '12-15 reps', rest: '60s', notes: 'Lockout and contract triceps lateral head.' }
        ]
      }
    ]
  },
  {
    id: 'dorian_yates_blood_and_guts',
    name: 'Dorian Yates: "Blood & Guts" High-Intensity Training (HIT)',
    legend: 'Dorian Yates (6x Mr. Olympia)',
    phase: 'cutting',
    daysPerWeek: 4,
    frequencyType: '4-Day Split with Rest Days Interspersed',
    philosophy: 'Perform 1-2 warm-up sets, then ONE single all-out work set taken past absolute positive failure with forced reps and rest-pause. Maximum muscular stress with minimal systemic exhaustion.',
    days: [
      {
        dayLabel: 'Day 1',
        focus: 'Delts, Triceps & Abs',
        exercises: [
          { name: 'Seated Dumbbell Shoulder Press', sets: '1 all-out work set', reps: '6-8 to failure', rest: '120s', notes: 'Warm up progressively, then 1 brutal set to concentric failure.' },
          { name: 'Dumbbell Side Lateral Raises', sets: '1 all-out work set', reps: '8-10 + 2 partials', rest: '90s', notes: 'Burn out medial deltoids completely.' },
          { name: 'Triceps Cable Pushdowns + Dips', sets: '1 all-out work set', reps: '8-10 reps', rest: '90s', notes: 'Drop weight 20% on failure for 3 additional reps.' }
        ]
      },
      {
        dayLabel: 'Day 2',
        focus: 'Back, Rear Delts & Lower Back',
        exercises: [
          { name: 'Underhand Yates Barbell Row', sets: '1 all-out work set', reps: '6-8 to failure', rest: '120s', notes: '70-degree torso angle, bar pulled into waistline.' },
          { name: 'Close-Grip Lat Pulldown', sets: '1 all-out work set', reps: '8-10 reps', rest: '90s', notes: 'Strict full stretch and chest-touch squeeze.' },
          { name: 'Barbell Deadlifts from Pins', sets: '1 all-out work set', reps: '6-8 reps', rest: '150s', notes: 'Pin rack pull to spare knees and overload back density.' }
        ]
      },
      {
        dayLabel: 'Day 3',
        focus: 'Rest & Cardiovascular Recovery',
        exercises: [
          { name: 'Mobility & Recovery Meal Planning', sets: '1 day', reps: 'Full rest', rest: 'N/A', notes: 'Muscle grows when resting out of the gym.' }
        ]
      },
      {
        dayLabel: 'Day 4',
        focus: 'Chest, Biceps & Forearms',
        exercises: [
          { name: 'Incline Barbell Bench Press', sets: '1 all-out work set', reps: '6-8 to failure', rest: '120s', notes: 'Controlled descent, explosive push.' },
          { name: 'Flat Dumbbell Bench Press', sets: '1 all-out work set', reps: '8-10 reps', rest: '90s', notes: 'Full depth stretch on outer chest.' },
          { name: 'Incline Dumbbell Biceps Curls', sets: '1 all-out work set', reps: '8-10 to failure', rest: '90s', notes: 'Supinated curl with strict elbow lock.' }
        ]
      },
      {
        dayLabel: 'Day 5',
        focus: 'Legs (Quads, Hamstrings & Calves)',
        exercises: [
          { name: 'Leg Extensions (Pre-Exhaust)', sets: '1 all-out work set', reps: '10-12 to failure', rest: '90s', notes: 'Pre-exhaust quadriceps before compound press.' },
          { name: 'Heavy Leg Press or Barbell Squat', sets: '1 all-out work set', reps: '8-10 reps', rest: '150s', notes: 'Brutal deep presses.' },
          { name: 'Lying Hamstring Leg Curls', sets: '1 all-out work set', reps: '8-10 + negative hold', rest: '90s', notes: '5-second negative on final rep.' }
        ]
      }
    ]
  }
];
