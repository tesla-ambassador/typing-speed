# Frontend Mentor - Typing Speed Test solution

This is a solution to the [Typing Speed Test challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

I started this project a little later than when I signed up for it. Hope I get to finish it in time and I hope you find it a little useful.

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./public/preview.jpg)

### Links

I'll add the links once the project can be deployed.

<!-- - Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com) -->

## My process

### Built with

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utitlity first CSS framework
- [ShadCN](https://ui.shadcn.com/) - Component library (It's light)
- [Claude](https://claude.ai) (Basically my coding sensei)
- [YouTube](https://youtube.com) (AI doesn't have all the answers lol)

### What I learned

I mostly learned how to deal with having a content editable div although this isn't the approach I used. Thanks to Claude, I was able to use a method that kept the static text in a div and I had to use a hidden input element to register user input. The comparison logic wasn't as much of a hustle like trying to reflect it on the div containing the target text in RT (excuse my genz). It was buggin but I didn't throw in the towel cause quitting in 2026 is wiiilddd!!!

Anyways, I'm kinda done for the day (this is day 1). Need to rest this brain... I'm prolly going to read some manga.

Here's the code snippet of my component have fun.
ps: I don't want to add comments so lemme js explain some of the things here.
Sooo... the `inputRef.current?.focus()` helps bring the input component into focus when the `div` containing the target text is clicked. This function is triggered when the input element is blurred to prevent us from losing focus. ("Focus Panda" in Master Shifu's voice). Okay I'm deadass tired for the day and OnePunch man chapter 179 isn't going to read itself.

```js
// The test component
const export function TestBody() {
    const [targetText] = useState<string>("Example Text... I said Drake was the goat tho.. cuz he iz gng");
    const [userInput, setUserInput] = useState<string>()
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus();
    }, [])
   return (<div className="relative" onClick={() => inputRef.current?.focus()}>
   <div className="text-[40px] tracking-[0.4px] leading-[130%]">
   {targetText.split('').map((char, index) => {
    let colorClass = 'text-neutral-400'
    let displayChar = char
    if (index < userInput.length) {
        const isCorrect = userInput[index] === char
        colorClass = isCorrect ? "text-green-500" : "text-red-500"
        if (!isCorrect && displayChar === " ") {
            displayChar = "_"
            colorClass = "bg-red-500/30"
        }
        if (index === userInput.length) {
            colorClass = "bg-neutral-400";
        }

        return (
            <span key={index} className={colorClass}>
            {char}
            </span>
        )
    }
   })}
   </div>
   <input
   className="absolute pointer-events-none opacity-0"
   ref={inputRef}
   onBlur={() => inputRef.current?.focus()}
   onChange={(e) => setUserInput(e.target.value)}
   value={userInput}
   maxLenght={targetText.length}
    type="text" />
   </div>)
}
```

### Continued development

I plan on adding a Golang backend if time allows. (Using Postgres ofc cuz why not?)

### Useful resources

I'll leave this blank for now gng

## Author

- Website - [Tesla Ambassador](https://portfolio-pink-ten-21.vercel.app/)
- Frontend Mentor - [@Tesla Ambassador](https://www.frontendmentor.io/profile/tesla-ambassador)
- Twitter - [@yourusername](https://x.com/Mbawalla_)

## Acknowledgments

Shoutout my 🥷 Josh (Apple Pie Giraffe)
