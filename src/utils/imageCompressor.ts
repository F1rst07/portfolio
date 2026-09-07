/**
 * Compresses an image file (e.g. from file upload) before storing as Base64 in localStorage.
 * Resizes large dimensions to max 1200px width/height and compresses with JPEG quality 0.8.
 * This prevents exceeding localStorage's 5MB limit when uploading real photos.
 */
export async function compressImageFile(file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvasPopup = document.createElement('canvas');
        canvasPopup.width = width;
        canvasPopup.height = height;

        const ctx = canvasPopup.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Convert to web-friendly compressed JPEG
        const compressedBase64 = canvasPopup.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
