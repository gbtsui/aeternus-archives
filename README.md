# aeternus archives
A web-based interactive-ish lore document archive for my ongoing game/writing/art project Acausality.

## Why...?

So, I wrote a ton of lore for my characters. Like an unreasonable amount. Unfortunately I ended up not writing all of it down, and a lot of it is in a format where it's like diagetic internal in-universe documents. 

I saw CF Flagship was happening, and I figured, hey, what if I did this and finally got all my stuff together?
And so I did. Admittedly I don't have that many archive files written at the moment - I only have 3 characters complete to be honest.
But, Aeternus Archives provides me with a nice framework to host and store formatted pieces of writing that I can later use to loredrop and stuff without having to re-explain every time.
Also gives me an excuse to learn how to design documents and draw more of my characters.

Similarly, it's helping me a lot with CSS and HTML design. I've done a lot of web dev in my life but all of my sites and apps look terrible.
They're ugly. So hopefully this gets me better at the art of CSS and the science of HTML.

## Basic Summary
Each character I write is based on an element. Each character also exists within the same universe spanning 1500 years. And as such, the style of documents will span all manner of chronological and physical formats.

Hence why it's organized as a periodic table. Admittedly, I do... have more characters, but right now I only have a few elements up templated since they're the most finished ones.

## Mechanism (or at least my architectural plan as of now)

The core of this system is basically isolated embedded HTML files that each have their own styling and content, and together they create a cohesive image of who a character is.

I'm trying to have basically PDF-style documents that are actually ShadowDOM HTML elements imported from static .html files. 
This keeps the simplicity of pure HTML+CSS without the hassle of JavaScript (internal to documents)  and forces me to get better at HTML.
Also, because most of these documents are supposed to be like, printed paper documents, this makes sense as well in-universe.

## Stack
|  Technology  |    Role    |                    Why                     |
|:------------:|:----------:|:------------------------------------------:|
|   Next.js    | Framework  |            i'm just used to it             |
|    React     |  Frontend  |              built into Next               |
| TailwindCSS  |  Styling   | fast and works well for simple CSS editing |


To be honest this is an almost entirely frontend project. 


