"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface ComicStripProps {
  principleSlug: string;
}

export default function ComicStrip({ principleSlug }: ComicStripProps) {
  const [sceneImages, setSceneImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check which scene images exist for this principle
    const checkSceneImages = async () => {
      const scenes = [];
      
      // Check for scene_01.png through scene_04.png
      for (let i = 1; i <= 4; i++) {
        const scenePath = `/principles/${principleSlug}/scene_0${i}.png`;
        
        try {
          // Try to fetch the image to see if it exists
          const response = await fetch(scenePath, { method: 'HEAD' });
          if (response.ok) {
            scenes.push(scenePath);
          }
        } catch {
          // Image doesn't exist, continue to next
        }
      }
      
      setSceneImages(scenes);
      setIsLoading(false);
    };

    checkSceneImages();
  }, [principleSlug]);

  if (isLoading) {
    return null; // Don't show anything while loading
  }

  if (sceneImages.length === 0) {
    return null; // Don't show comic strip if no scene images exist
  }

  return (
    <div className="comic-strip-container mb-8">
      <div className="comic-strip">
        {sceneImages.map((imagePath, index) => (
          <div key={index} className="comic-scene">
            <Image
              src={imagePath}
              alt={`Scene ${index + 1}`}
              width={300}
              height={250}
              className="comic-image"
              priority={index < 2} // Prioritize first two images
            />
          </div>
        ))}
      </div>
    </div>
  );
}
