#!/usr/bin/env python3
"""Minify CSS and JavaScript files for better performance"""

import re
import os

def minify_css(content):
    """Simple CSS minification"""
    # Remove comments
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    # Remove unnecessary whitespace
    content = re.sub(r'\s+', ' ', content)
    # Remove spaces around specific characters
    content = re.sub(r'\s*([{}:;,])\s*', r'\1', content)
    # Remove trailing semicolon before closing brace
    content = re.sub(r';\}', '}', content)
    # Remove last semicolon
    content = re.sub(r';}', '}', content)
    return content.strip()

def minify_js(content):
    """Simple JavaScript minification"""
    # Remove single-line comments (but not URLs)
    content = re.sub(r'(?<!:)//.*$', '', content, flags=re.MULTILINE)
    # Remove multi-line comments
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    # Remove unnecessary whitespace
    content = re.sub(r'\s+', ' ', content)
    # Remove spaces around specific characters
    content = re.sub(r'\s*([{}();,=<>!&|])\s*', r'\1', content)
    # Remove empty lines
    content = re.sub(r'\n\s*\n', '\n', content)
    return content.strip()

def process_file(input_path, output_path, minify_func):
    """Process a single file"""
    try:
        with open(input_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        minified = minify_func(content)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(minified)
        
        original_size = os.path.getsize(input_path) / 1024
        minified_size = os.path.getsize(output_path) / 1024
        reduction = ((original_size - minified_size) / original_size) * 100
        
        print(f"Minified: {input_path} -> {output_path}")
        print(f"  Size: {original_size:.1f}KB -> {minified_size:.1f}KB ({reduction:.1f}% reduction)")
        
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

def main():
    """Minify CSS and JS files"""
    # CSS files
    css_files = [
        ('src/css/styles.css', 'src/css/styles.min.css')
    ]
    
    # JS files
    js_files = [
        ('src/js/main.js', 'src/js/main.min.js')
    ]
    
    print("Minifying CSS files...")
    print("-" * 50)
    for input_file, output_file in css_files:
        if os.path.exists(input_file):
            process_file(input_file, output_file, minify_css)
    
    print("\nMinifying JavaScript files...")
    print("-" * 50)
    for input_file, output_file in js_files:
        if os.path.exists(input_file):
            process_file(input_file, output_file, minify_js)
    
    print("\nMinification complete!")

if __name__ == "__main__":
    main()