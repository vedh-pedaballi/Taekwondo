#!/usr/bin/env python3
"""
Generate app icons for Tornado Sports Club PWA
This script creates icons in various sizes needed for the mobile app
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, text="TS", bg_color="#292a72", text_color="#ffffff"):
    """Create a simple icon with text"""
    # Create image with background
    img = Image.new('RGBA', (size, size), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Add text
    try:
        # Try to use a system font
        font_size = size // 3
        font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", font_size)
    except:
        # Fallback to default font
        font = ImageFont.load_default()
    
    # Calculate text position to center it
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (size - text_width) // 2
    y = (size - text_height) // 2
    
    # Draw text
    draw.text((x, y), text, fill=text_color, font=font)
    
    return img

def main():
    """Generate all required icon sizes"""
    # Create icons directory
    icons_dir = "static/icons"
    os.makedirs(icons_dir, exist_ok=True)
    
    # Icon sizes needed for PWA
    sizes = [16, 32, 72, 96, 128, 144, 152, 167, 180, 192, 384, 512]
    
    print("Generating app icons...")
    
    for size in sizes:
        icon = create_icon(size)
        filename = f"icon-{size}x{size}.png"
        filepath = os.path.join(icons_dir, filename)
        icon.save(filepath, "PNG")
        print(f"Created {filename}")
    
    # Create shortcut icons
    shortcut_icons = {
        "classes-icon.png": ("📅", "#c03535"),
        "events-icon.png": ("🎉", "#292a72"),
        "gallery-icon.png": ("🖼️", "#ff6b6b")
    }
    
    for filename, (emoji, color) in shortcut_icons.items():
        icon = create_icon(96, emoji, color)
        filepath = os.path.join(icons_dir, filename)
        icon.save(filepath, "PNG")
        print(f"Created {filename}")
    
    print("All icons generated successfully!")
    print(f"Icons saved in: {icons_dir}")

if __name__ == "__main__":
    main() 