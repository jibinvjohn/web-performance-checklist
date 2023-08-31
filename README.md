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


## Notes
1. HTTP Requests - Http/2 instead of HTTP/1 - Able to reuse same connection while fetching mutiple resources from same server. https://web.dev/performance-http2/
1. 

## References

1. https://web.dev/measure/
1. Udemy Course Building Faster Websites - By Luke Harrison
1. https://www.webpagetest.org/