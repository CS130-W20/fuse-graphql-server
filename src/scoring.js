/**
 * View the function and play with parameters here
 * https://www.desmos.com/calculator/0vr3iiffck
 */

// Constants base scoring
const baseScore = 5;

// Constants for time bonus multiplier
const steepness = 2.1;
const shift = 62.0;

// Constants for friend bonus multiplier
const attendeeMultiplierControl = 5.0;

export default function computeScore(attendeeCount, daysLit) {
  // Invariant checking
  if (daysLit < 0 || attendeeCount < 0) {
    return null;
  }

  // Clamp values to maximums
  const clampedDaysLit = daysLit <= 30 ? daysLit : 30;
  const clampedAttendeeCount = attendeeCount <= 20 ? attendeeCount : 20;

  // Compute score
  const timeMultiplier = Math.sqrt(1 - (steepness * clampedDaysLit) + shift) + 1;
  const attendeeMultiplier = attendeeMultiplierControl * clampedAttendeeCount;

  return Math.floor(baseScore * (attendeeMultiplier + timeMultiplier));
}
