//please create your own apiKey.js file with your own API key
import { GOOGLE_API_KEY } from "../apiKey";

export function getMapPreview(lat, lon) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lon}&key=${GOOGLE_API_KEY}`;

  return imagePreviewUrl;
}
