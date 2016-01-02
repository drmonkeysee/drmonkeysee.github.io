Title: A .plan file for the New Year
Category: blog
Tags: blogging, theming
Summary: A word on the intent of this dev log
Date: 2016-01-01

I'm still sussing out exactly what I want this blog to be but there's a hint in the title. This is a Dev Log. To wit: a log of development activities I'm doing in my freetime. I may talk about work obliquely on occasion (in case it wasn't obvious I am also a professional programmer) but that won't be the focus.

The immediate metaphor that comes to mind is the old-school [.plan file](http://www.catb.org/jargon/html/P/plan-file.html). This will be an ongoing record of whatever I'm doing, or thinking about doing, or having trouble with, or general thoughts on software development or technology if I'm feeling sassy. The specific balance of these topics will evolve I'm sure.

To that point my goal, starting in 2016, is to post at least *once* a week to get in the habit of keeping this project going. It'd be sad if this turned into another derelict blog abandoned on the Internet and setting a schedule should hopefully avoid that fate. At the very least it'll take the form of a "weekly update" summing up any thoughts or notes since the previous post. Let's see how it goes!


## Ongoing theme work

Speaking of blog content, I do eventually want to stop blogging about the creation of this blog but that won't happen until it's done. Theme work is ongoing and I have a basic layout for the **index.html** template. I toggled between a two-column and one-column layout but the one-column layout was vetoed independently by two different friends so I'm fleshing out details of the two-column layout. This lines up with the spec sketch from [earlier]({filename}/theme-layout-thoughts.markdown) so that's nice.

There's at least one detail that has become apparent now that I have a semi-functional layout. The home page either needs to be a list of summaries or a page of full articles. Inlining a single article and showing summaries for the rest of the entries looks awkward. I'm leaning towards the former since the latter is a bit heavy for a home page.

Progess is coming along and I'll show my work in the near future. Since this dev log is composed of side-projects and hobbies, progress will be in fits and starts as life or other interests get in the way. There may not be impressive jumps forward in every blog entry but we'll get there eventually.

## Pelican Summaries

I just noticed in the Pelican settings documentation that I can set a summary length that will take the first X characters from the body of the article if the `Summary` metadata field isn't set directly. This is cool because coming up with an article body, an article title, an article slug, *and* an article summary is a bit much. I'll look at this later but I will probably stop writing explicit summaries. This will also make the list of summaries mentioned above more palatable as the home page.
