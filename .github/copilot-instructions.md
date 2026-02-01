# Copilot Instructions for Outfique

## Project Overview
Outfique is a fashion/clothing creation platform that uses AI-powered image generation to help users design and visualize custom outfits. The application features an interactive web interface with a Node.js backend.

## Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (no frameworks)
- **Backend**: Node.js with built-in `http` module (no Express)
- **AI Integration**: Hugging Face Inference API (Stable Diffusion 2)
- **Server**: Simple HTTP server serving static files and API endpoints

## Code Style and Standards

### JavaScript
- Use `const` and `let` instead of `var`
- Use arrow functions where appropriate
- Follow existing naming conventions: camelCase for variables and functions
- Use async/await for asynchronous operations
- Keep code simple and readable - avoid unnecessary complexity
- No external libraries or frameworks unless absolutely necessary

### HTML
- Use semantic HTML5 elements
- Include proper meta tags for viewport and charset
- Use descriptive, kebab-case naming for files with spaces (e.g., "creation outfique.html")
- Inline styles are acceptable for page-specific styling

### CSS
- Use CSS custom properties (CSS variables) defined in `:root`
- Follow the Outfique color palette:
  - Primary: `--outflique-teal: #5cc1b6`
  - Accent: `--outflique-mint: #a8c9b6`
  - Light: `--outflique-cream: #f1e3b6`
  - Warm: `--outflique-peach: #f9a6a1`
  - Highlight: `--outflique-pink: #f75088`
  - Text: `--outflique-ink: #2a2624`
  - Background: `--outflique-paper: #fff7ef`
- Use `box-sizing: border-box` for all elements
- Prefer flexbox for layouts
- Include smooth animations and transitions for interactive elements

## Naming Conventions
- **Files**: Use descriptive names with spaces for HTML files (e.g., "about outfique.html")
- **CSS files**: Use lowercase with spaces (e.g., "outflique beh.css")
- **JavaScript files**: Use camelCase or descriptive names (e.g., "Outfiquemoako.js", "collections.js")
- **Variables**: Use camelCase (e.g., `const mimeTypes`, `let filePath`)
- **Constants**: Use camelCase or UPPER_CASE for true constants (e.g., `const PORT`, `const HF_MODEL`)

## Server and API

### Server Configuration
- Server runs on port 5500 by default
- Serves static files from the root directory
- Default route ("/") serves "creation outfique.html"
- API endpoint: `/api/generate` for POST requests to generate AI images

### Environment Variables
- `HF_API_KEY`: Hugging Face API key for AI image generation
- Can also accept API key via `x-hf-key` header in requests

### MIME Types
Support the following file types:
- HTML, CSS, JavaScript
- Images: PNG, JPG, JPEG, SVG, ICO

## Error Handling
- Return appropriate HTTP status codes (404, 401, 403, 500)
- Provide descriptive error messages in JSON format for API endpoints
- Validate file paths to prevent directory traversal attacks
- Check for API key presence before making AI generation requests

## Security
- Always validate file paths to ensure they start with ROOT directory
- Never expose sensitive information (API keys) in client-side code
- Use environment variables for configuration secrets
- Return 403 Forbidden for unauthorized path access attempts

## UI/UX Guidelines
- Maintain the "Summer Sunset" aesthetic with warm, vibrant colors
- Include smooth hover effects and transitions on interactive elements
- Use staggered animations for card reveals (80ms delay between items)
- Include 3D transform effects on card hover (tilt effect)
- Keep the interface clean and modern with sufficient whitespace

## Testing and Validation
- Test all file serving functionality
- Verify API endpoints respond correctly with and without authentication
- Ensure all static assets load properly (images, CSS, JavaScript)
- Test responsive behavior on different screen sizes
- Validate that AI image generation works with proper API credentials

## Development Workflow
- Start server with: `node server.js`
- Access application at: `http://127.0.0.1:5500`
- Test API endpoint with POST requests to `/api/generate`
- Keep dependencies minimal - use Node.js built-in modules when possible

## Important Notes
- This is a lightweight project - avoid adding heavy frameworks or build tools
- Preserve the existing file naming convention even if unconventional (spaces in filenames)
- Maintain backward compatibility when making changes
- The project uses no package.json or dependencies - keep it that way unless absolutely necessary
- All styling should align with the Outfique brand identity and color palette
