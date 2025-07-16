#!/usr/bin/env python3
"""Convert PNG images to WebP format for better performance"""

import os
from PIL import Image
import glob

def convert_to_webp(source_path, quality=85):
    """Convert a single image to WebP format"""
    try:
        # Open the image
        img = Image.open(source_path)
        
        # Create WebP filename
        webp_path = os.path.splitext(source_path)[0] + '.webp'
        
        # Skip if WebP already exists
        if os.path.exists(webp_path):
            print(f"WebP already exists: {webp_path}")
            return
        
        # Convert to RGB if necessary (WebP doesn't support transparency in RGBA well)
        if img.mode in ('RGBA', 'LA'):
            # Create a white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        elif img.mode not in ('RGB',):
            img = img.convert('RGB')
        
        # Save as WebP
        img.save(webp_path, 'WEBP', quality=quality, method=6)
        print(f"Converted: {source_path} -> {webp_path}")
        
        # Get file sizes for comparison
        original_size = os.path.getsize(source_path) / 1024
        webp_size = os.path.getsize(webp_path) / 1024
        reduction = ((original_size - webp_size) / original_size) * 100
        
        print(f"  Size: {original_size:.1f}KB -> {webp_size:.1f}KB ({reduction:.1f}% reduction)")
        
    except Exception as e:
        print(f"Error converting {source_path}: {e}")

def main():
    """Convert all PNG images in the images directory to WebP"""
    images_dir = "images"
    
    # Find all PNG files
    png_files = glob.glob(os.path.join(images_dir, "*.png"))
    
    if not png_files:
        print("No PNG files found in images directory")
        return
    
    print(f"Found {len(png_files)} PNG files to convert")
    print("-" * 50)
    
    for png_file in png_files:
        convert_to_webp(png_file)
    
    print("-" * 50)
    print("Conversion complete!")

if __name__ == "__main__":
    main()