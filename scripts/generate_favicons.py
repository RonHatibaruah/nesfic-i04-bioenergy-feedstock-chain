import os
from PIL import Image, ImageDraw

def create_app_icon(size):
    # Create image with RGBA
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Scale factor based on 64px base
    s = size / 64.0
    
    # Background rounded rectangle
    rx = int(16 * s)
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=rx, fill=(6, 78, 59, 255))
    draw.rounded_rectangle([int(1 * s), int(1 * s), size - int(2 * s), size - int(2 * s)], radius=rx, outline=(52, 211, 153, 100), width=max(1, int(1.5 * s)))
    
    # Outer ring
    bbox_ring = [int(7 * s), int(7 * s), int(57 * s), int(57 * s)]
    draw.ellipse(bbox_ring, outline=(56, 189, 248, 120), width=max(1, int(1.5 * s)))
    
    # Inner sprout & energy symbol
    # Sprout green leaf
    leaf_poly = [
        (int(30 * s), int(46 * s)),
        (int(22 * s), int(44 * s)),
        (int(17 * s), int(36 * s)),
        (int(18 * s), int(28 * s)),
        (int(25 * s), int(29 * s)),
        (int(30 * s), int(35 * s)),
        (int(31 * s), int(42 * s)),
    ]
    draw.polygon(leaf_poly, fill=(34, 197, 94, 255))
    
    # Bioenergy flame
    flame_poly = [
        (int(31 * s), int(46 * s)),
        (int(30 * s), int(37 * s)),
        (int(34 * s), int(31 * s)),
        (int(38 * s), int(26 * s)),
        (int(41 * s), int(30 * s)),
        (int(45 * s), int(27 * s)),
        (int(47 * s), int(34 * s)),
        (int(45 * s), int(41 * s)),
        (int(40 * s), int(46 * s)),
        (int(35 * s), int(47 * s)),
    ]
    draw.polygon(flame_poly, fill=(249, 115, 22, 255))
    
    # Flame core
    core_poly = [
        (int(34 * s), int(45 * s)),
        (int(33 * s), int(40 * s)),
        (int(36 * s), int(35 * s)),
        (int(39 * s), int(32 * s)),
        (int(42 * s), int(36 * s)),
        (int(41 * s), int(42 * s)),
        (int(38 * s), int(45 * s)),
    ]
    draw.polygon(core_poly, fill=(250, 204, 21, 255))
    
    # IoT pulse dot
    dot_x, dot_y, dot_r = int(45 * s), int(18 * s), max(1, int(2.5 * s))
    draw.ellipse([dot_x - dot_r, dot_y - dot_r, dot_x + dot_r, dot_y + dot_r], fill=(56, 189, 248, 255))
    
    return img

def main():
    public_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public')
    
    icon_16 = create_app_icon(16)
    icon_16.save(os.path.join(public_dir, 'favicon-16x16.png'))
    
    icon_32 = create_app_icon(32)
    icon_32.save(os.path.join(public_dir, 'favicon-32x32.png'))
    
    icon_180 = create_app_icon(180)
    icon_180.save(os.path.join(public_dir, 'apple-touch-icon.png'))
    
    # ICO file containing both 16 and 32
    icon_32.save(os.path.join(public_dir, 'favicon.ico'), format='ICO', sizes=[(16, 16), (32, 32)])
    print("Successfully generated all favicons (16x16, 32x32, 180x180, .ico)")

if __name__ == '__main__':
    main()
