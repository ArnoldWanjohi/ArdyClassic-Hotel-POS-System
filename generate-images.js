const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Sample menu items
const menuItems = [
    { name: 'Chicken Burger', category: 'food' },
    { name: 'Beef Burger', category: 'food' },
    { name: 'Fries', category: 'food' },
    { name: 'Soda', category: 'drinks' },
    { name: 'Iced Tea', category: 'drinks' },
    { name: 'Chocolate Cake', category: 'desserts' },
    { name: 'Ice Cream', category: 'desserts' },
    { name: 'Grilled Chicken', category: 'food' }
];

// Function to create a simple image with text
function createImage(text, filename) {
    const width = 400;
    const height = 300;
    
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    
    // Set background color based on category
    const colors = {
        food: '#FFE0B2',
        drinks: '#B3E5FC',
        desserts: '#F8BBD0'
    };
    
    const category = menuItems.find(item => 
        item.name.toLowerCase() === text.toLowerCase()
    )?.category || 'food';
    
    context.fillStyle = colors[category] || '#E0E0E0';
    context.fillRect(0, 0, width, height);
    
    // Add text
    context.fillStyle = '#333';
    context.font = 'bold 24px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // Split text into multiple lines if needed
    const words = text.split(' ');
    let line = '';
    let y = height / 2 - 20;
    
    for (const word of words) {
        const testLine = line + word + ' ';
        const metrics = context.measureText(testLine);
        if (metrics.width > width - 40 && line.length > 0) {
            context.fillText(line, width / 2, y);
            line = word + ' ';
            y += 30;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, width / 2, y);
    
    // Add category
    context.font = '16px Arial';
    context.fillText(`(${category})`, width / 2, y + 30);
    
    // Save the image
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(path.join(imagesDir, filename), buffer);
}

// Generate images for all menu items
menuItems.forEach(item => {
    const slug = item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const filename = `${slug}.jpg`;
    createImage(item.name, filename);
    console.log(`Created image: ${filename}`);
});

console.log('All images have been generated in the images/ directory.');
