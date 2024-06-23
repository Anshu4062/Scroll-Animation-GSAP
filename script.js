document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    const stickyBar = document.querySelector(".sticky-bar");
    const footerTrigger = document.querySelector(".trigger-footer");
    const footerTriggerHeight = footerTrigger.offsetHeight;

    function getStickyBarCenter() {
        return stickyBar.offsetTop + stickyBar.offsetHeight / 2;
    }

    document.querySelectorAll(".row").forEach((row) => {
        ScrollTrigger.create({
            trigger: row,
            start: () => `top+=${getStickyBarCenter() - 550} center`,
            end: () => `top+=${getStickyBarCenter() - 450} center`,
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const maxGap = window.innerWidth < 900 ? 10 : 15;
                const minGap = window.innerWidth < 900 ? 0.5 : 1;
                const currentGap = minGap + (maxGap - minGap) * progress;
                row.style.gap = `${currentGap}em`
            }
        })
    })

    document.querySelectorAll(".row").forEach((row) => {
        ScrollTrigger.create({
            trigger: row,
            start: () => `top+=${getStickyBarCenter() - 400} center`,
            end: () => `top+=${getStickyBarCenter() - 300} center`,
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const maxGap = window.innerWidth < 900 ? 0.5 : 1;
                const minGap = window.innerWidth < 900 ? 10 : 15;
                const currentGap = minGap + (maxGap - minGap) * progress;
                row.style.gap = `${currentGap}em`
            }
        })       
    })

    ScrollTrigger.create({
        trigger: footerTrigger,
        start: "top bottom",
        end: () => `top+=${footerTriggerHeight - window.innerHeight} center`,
        scrub: true,
        onUpdate: (self) => {
            const startTop = 50;
            const endTop = 92;
            const newTop = startTop + (endTop - startTop) * self.progress;
            stickyBar.style.top = `${newTop}%`
        }
    })

    ScrollTrigger.create({
        trigger: footerTrigger,
        start: () => `top+=${footerTriggerHeight - (window.innerHeight + 100)} bottom`,
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
            const fontSizeStart = window.innerWidth < 900 ? 2.5 : 1.25;
            const fontSizeEnd = 9;
            const newFontSize = fontSizeStart + (fontSizeEnd - fontSizeStart) * self.progress;
            stickyBar.querySelectorAll("p").forEach((p) => {
                p.style.fontSize = `${newFontSize}vw`
            })
        }
    })
})