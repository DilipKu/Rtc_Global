import os

replacements = {
    'wholesale-western-wear-india': 'wholesale-ladies-wear-suppliers',
    'wholesale-kids-wear-india': 'wholesale-kids-wear-suppliers',
    'wholesale-mens-wear-india': 'wholesale-mens-wear-suppliers',
    'wholesale-blankets-home-india': 'wholesale-blanket-suppliers',
    'wholesale-saree-suppliers-india': 'wholesale-saree-suppliers',
    'wholesale-ethnic-wear-india': 'wholesale-ethnic-wear-suppliers',
    'wholesale-ladies-wear-india': 'wholesale-ladies-wear-suppliers' # since it's practically the same category
}

def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if not file.endswith(('.js', '.jsx', '.ts', '.tsx', '.html', '.css')):
                continue
            
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements.items():
                new_content = new_content.replace(old, new)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")

process_directory('/Users/dilipkrgupta/Rtc_Global/src')
