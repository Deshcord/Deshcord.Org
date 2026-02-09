# Charity Organization Website Template

A modern, responsive, and customizable website template for charity organizations. Perfect for GitHub Pages deployment!

## ✨ Features

- 📊 **Animated Money Counter** - Show your fundraising progress with smooth animations
- 🖼️ **Photo Gallery** - Display your charity work with a beautiful responsive gallery
- 🎨 **Highly Customizable** - Easy-to-edit color schemes and content
- 📱 **Fully Responsive** - Looks great on all devices
- ⚡ **Fast & Lightweight** - No frameworks needed, just pure HTML/CSS/JS
- 🚀 **GitHub Pages Ready** - Deploy in minutes

## 🚀 Quick Start (GitHub Pages Setup)

### Method 1: Using This Template Directly

1. **Create a new repository on GitHub**
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it `your-charity-name.github.io` (replace `your-charity-name` with your desired name)
   - Make it public

2. **Upload the files**
   - Upload `index.html`, `styles.css`, and `script.js` to your repository
   - Alternatively, clone this repository and push to your new repo

3. **Enable GitHub Pages**
   - Go to your repository Settings
   - Scroll down to "Pages" section
   - Under "Source", select "main" branch
   - Click Save
   - Your site will be live at `https://your-username.github.io/your-charity-name/`

### Method 2: Using Git Commands

```bash
# Clone or download this template
git clone <this-repo-url>

# Navigate to the folder
cd charity-website

# Initialize git (if not already a repo)
git init

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Add, commit, and push
git add .
git commit -m "Initial commit"
git push -u origin main
```

## 🎨 Customization Guide

### 1. Update Statistics Counter

Open `script.js` and modify the values at the top:

```javascript
const charityStats = {
    moneyRaised: 125000,      // Change to your amount
    peopleHelped: 5420,       // Change to your number
    projectsCompleted: 87,    // Change to your number
    volunteers: 234           // Change to your number
};
```

### 2. Change Colors & Branding

Open `styles.css` and edit the CSS variables at the top:

```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --primary-dark: #1e40af;       /* Darker shade */
    --secondary-color: #10b981;    /* Secondary color */
    --accent-color: #f59e0b;       /* Accent/CTA color */
}
```

### 3. Update Content

Open `index.html` and modify:

- **Organization Name**: Search for "Hope Foundation" and replace with your name
- **Hero Section**: Update the title and subtitle
- **About Section**: Replace the mission text
- **Contact Information**: Update email, phone, and address

### 4. Add Your Own Photos

#### Option A: Replace Image URLs in HTML

In `index.html`, find the gallery section and replace the Unsplash URLs with your own:

```html
<div class="gallery-item">
    <img src="path/to/your/image.jpg" alt="Description">
    <div class="gallery-overlay">
        <h3>Your Title</h3>
        <p>Your description</p>
    </div>
</div>
```

#### Option B: Use Custom Gallery Array (Advanced)

In `script.js`, uncomment and modify the `customImages` array:

```javascript
const customImages = [
    {
        src: 'images/project1.jpg',
        title: 'Water Well Project',
        description: 'Providing clean water to 500 families'
    },
    {
        src: 'images/project2.jpg',
        title: 'School Building',
        description: 'New classroom for 200 students'
    }
    // Add more...
];
```

### 5. Update Hero Background Image

In `styles.css`, find the `.hero` class and change the background image:

```css
.hero {
    background-image: url('path/to/your/hero-image.jpg');
}
```

## 📁 File Structure

```
charity-website/
├── index.html          # Main HTML file
├── styles.css          # All styling and design
├── script.js           # Interactive functionality
├── images/            # (Optional) Your image folder
│   ├── hero.jpg
│   ├── project1.jpg
│   └── ...
└── README.md          # This file
```

## 🔧 Advanced Customization

### Adding More Sections

Copy any section from `index.html` and paste it where you want. Make sure to:
1. Give it a unique `id`
2. Add corresponding navigation link
3. Style it in `styles.css` if needed

### Integrating Contact Form

The template includes a basic form. To make it functional:

#### Option 1: Formspree (Recommended)
1. Go to [Formspree.io](https://formspree.io)
2. Create a free account
3. Get your form endpoint
4. In `script.js`, uncomment and update the Formspree integration:

```javascript
fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
})
```

#### Option 2: Netlify Forms
If using Netlify instead of GitHub Pages, just add `netlify` attribute to form tag.

### Adding Social Media Links

In `index.html`, find the social links section and update:

```html
<div class="social-links">
    <a href="https://facebook.com/yourpage" class="social-link">Facebook</a>
    <a href="https://twitter.com/yourhandle" class="social-link">Twitter</a>
    <a href="https://instagram.com/yourhandle" class="social-link">Instagram</a>
</div>
```

## 📱 Responsive Design

The template is fully responsive and tested on:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 💡 Tips

1. **Optimize Images**: Compress your images before uploading (use TinyPNG or similar)
2. **Use Relative Paths**: When adding images, use relative paths like `images/photo.jpg`
3. **Test Locally**: Open `index.html` in your browser to test before deploying
4. **Keep It Simple**: Don't overcomplicate - the template is designed to be lightweight

## 🤝 Support

If you encounter issues:
1. Check that all file names are correct
2. Ensure images are in the correct path
3. Verify GitHub Pages is enabled in repository settings
4. Clear browser cache and refresh

## 📄 License

Free to use for any charity or non-profit organization. Attribution appreciated but not required.

## 🎉 You're All Set!

Your charity website is ready to make a difference. Update the content, add your photos, and start sharing your mission with the world!

---

**Need help?** Create an issue in the repository or reach out to the community.

**Want to contribute?** Pull requests are welcome!
