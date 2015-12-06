Title: Theme Shopping
Category: blog
Tags: pelican, blogging
Summary: A trip to the theme emporium

I've settled on a url scheme and other random settings so the time has come to shop for a theme. I popped over to [pelican-themes](https://github.com/getpelican/pelican-themes) and... frankly... not crazy about what's on offer.

Don't get me wrong, the craftsmanship on display is fine, but none of them grab me. However the pelican-bootstrap3 theme points a way forward. What if I just built my own theme on top of bootstrap? Follow up question: why don't I just use pelican-bootstrap3?

In short: I want control. The pelican-bootstrap3 theme contains the contents of bootstrap3 inline instead of pulling it in from a CDN, which adds a maintenance burden keeping everything up-to-date with official release channels. I'm one of those devs that likes to sit on the latest versions as seamlessly as possible and cleaning up someone else's theme to square it away to my satisfaction sounds less fun than just writing it myself.

So why not? Well it means this blog is gonna look pretty entry-level for longer than I wanted. On the other hand I control the blog from the ground up and might as well learn [Jinja](http://jinja.pocoo.org) while I'm here. As will become evident in later entries much of my hobby work is about building stuff from scratch so carrying that philosophy forward to my dev log seems a natural fit.
