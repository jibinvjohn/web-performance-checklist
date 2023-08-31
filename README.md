# Website Optimization Checklist

## Testing conditions

1. Device - Moto G4
1. Network Speed - 3G
1. Test Location - VA
1. Browser - Google Chrome

## Step by step improvements

Metric | Start Render | First Contentful Paint | Speed Index | Largest Contentful Paint | Cumulative Layout Shift  | Time to Interactive | Total Blocking Time | Bytes Downloaded | Fully Loaded | Lighthouse Score 
--- | --- | --- | --- |--- |--- |--- |--- |--- |--- |--- 
Initial Report | 5.3s | 5.3s | 8.2s | 18.9s | 0.231 | 35.7s | 0.6s | 4264kb | 33.0s | 12
3rd Party Static Assets  | 4.9s | 4.9s | 7.2s | 18.3s | 0 | 27s | 0.6s | 4817kb | 29.8s | 25
Image Resizing  | 4.4s | 4.4s | 4.9s | 6.2s | 0 | 12s | 0.6s | 658kb | 14s | 38
Image Optimization  | 4.5s | 4.5s | 4.8s | 5.8s | 0 | 9.6s | 0.6s | 615kb | 13s | 46
Async/Defer JS & Resource Improvements  | 3.9s | 3.8s | 4.6s | 4.2s | 0 | 6.5s | 0.4s | 569kb | 12s | 70
Text Asset Optimization  | 3.7s | 3.7s | 3.8s | 3.9s | 0 | 2.6s | 0.6s | 472kb | 12.5s | 79
Critical CSS  | 2.2s | 2.2s | 2.6s | 2.8s | 0.185 | 2.7s | 0.7s | 476kb | 11s | 81
Self Hosted Fonts  | 2.3s | 2.3s | 2.7s | 2.9s | 0.185 | 2.6s | 0.7s | 503kb | 11s | 81
Lazy Loading  | 2.1s | 2.1s | 2.5s | 2.7s | 0.001 | 3.0s | 0.2s | 240kb | 11.8s | 82
Remove Unused CSS  | 2.1s | 2.1s | 2.5s | 2.7s | 0.001 | 3.0s | 0.2s | 226kb | 7.9s | 94
Remove Unused Javascript  | 2.1s | 2.1s | 2.5s | 2.7s | 0.001 | 2.4s | 0s | 136kb | 4.5s | 96
Final Report(Caching)  | 2.1s | 2.1s | 2.5s | 2.7s | 0.001 | 2.4s | 0s | 137kb | 4.5s | 99

## Notes
1. HTTP Requests - Http/2 instead of HTTP/1 - Able to reuse same connection while fetching mutiple resources from same server. https://web.dev/performance-http2/
1. 3rd Party Static Assets - Retrieve static assests from a single server. It's beneficial to have local copies of external dependencies and serve from own server. Anyway we would need to deliver content through CDN for our application artifacts. https://web.dev/preload-critical-assets/
1. Image Resizing - Having multiple image sizes for various devices like mobile and desktop.
1. Optimize Images - Optimize images using imagemin or other tools for removing unneeded metadata and othe details. Have progressive JPGs. Have newer file formats like webp. Serve webp when possible else fallbacks to jpg.
1. Resource Hints - DNS Prefetch, Preconnect, Prefetch, Preload, Prerender
1. Async/Defer Javascript - https://web.dev/efficiently-load-third-party-javascript/
1. Text Compression - Brotli and Gzip https://web.dev/reduce-network-payloads-using-text-compression/
1. Text Asset Optimization - Combine multiple files into single using rollup to ensure one large file is downloaded which enables better compression as well.
1. Critical CSS - Seperate out critical css and load the remaining similar to async/defer. Using critical npm package.
1. Google Fonts - Preconnect and crossorigin for DNS prefetch
1. Self Hosted Fonts - Theoretically, this improves web performance as it eliminates 3rd party fonts.
https://web.dev/font-best-practices/
1. Lazy Loading - load an asset only when its needed. https://web.dev/browser-level-image-lazy-loading/
1. Remove unused CSS - Use coverage dev tools to understand how much is unused and remove the unneeded. Use purgecss to remove unwanted.
1. Caching Behaviour - Provide ideal cache-control headers. https://web.dev/love-your-cache/
1. Next Steps - CDN, Cache using Service Workers, Navigation timing API 

## References

1. https://web.dev/measure/
1. Udemy Course Building Faster Websites - By Luke Harrison
1. https://www.webpagetest.org/