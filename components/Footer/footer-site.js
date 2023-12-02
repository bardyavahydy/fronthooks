let template = document.createElement('template')
template.innerHTML =`
    <link rel="stylesheet" href="components/Footer/footer-site.css">
    <div class="container-footer">
                <article class="container-introducing-myself">
                    <h4 class="container-introducing-myself__title">آکادمی آنلاین فرانت هوکس، دوره های کوچ محور <strong>برنامه نویسی وب</strong></h4>
                    <p class="container-introducing-myself__desc">
                        <strong>صاحب محمدی هستم ، برنامه نویس وب</strong>
                        و مدیر وبسایت آموزشی فرانت هوکس. ارائه آموزشی کاربردی، پروژه محور در کنار مربی هدف اصلی ماست. ابتدا در یک مسیر یادگیری دقیق قرار می گیرید. در این مسیر همه آموزش ها با وسواس خاصی طراحی شده اند به گونه ای که مفاهیم برنامه نویسی را در طی پروژه های متنوع به خوبی درک بکنید. در طی مسیر شما قطعا تنها نخواهید بود، بلکه مربی کار آزموده در کنارتان هست تا خیالتان از بابت مشکلات فنی و مشاوره ای راحت باشد. زمان شما برای ما مهم هست و میخواهیم بدون سعی و خطا در کمترین زمان ممکن به بازار کار برسید. علاوه بر این، پشتیبانی دوره ها مدام العمر است و برای همیشه به سوالات شما پاسخ داده می شود. این یعنی خلق یک تجربه خوب در یک مسیر مشخص به همراه مربی و پشتیبان.
                    </p>
                    <p class="container-introducing-myself__desc-links">
                        شما می‌توانید از طریق 
                        <a href="https://www.instagram.com/sahebmohamadi.ir/" class="container-introducing-myself__desc-link">اینستاگرام</a>
                        ٬ 
                        <a href="https://t.me/fronthooks_support" class="container-introducing-myself__desc-link">تگرام</a>
                        یا 
                        <a href="https://ir.linkedin.com/in/saheb-mohamadi-227ab4112" class="container-introducing-myself__desc-link">لینکدین</a>
                         با من در ارتباط باشید
                    </p>
                    <div class="container-ways-of-communication space-between">
                        <a href="https://www.instagram.com/sahebmohamadi.ir/" class="cursor-pointer border-radius-circle transition-bg-3s container-ways-of-communication__insta-link container-ways-of-communication__links center">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24" class="container-ways-of-communication__insta-link-svg container-ways-of-communication__svgs cursor-pointer" height="1em" width="1em">
                                <title></title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path>
                            </svg>
                        </a>
                        <a  class="cursor-pointer border-radius-circle transition-bg-3s container-ways-of-communication__linkedin-link container-ways-of-communication__links center">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24" class="container-ways-of-communication__linkedin-link-svg container-ways-of-communication__svgs cursor-pointer" height="1em" width="1em">
                                <title></title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                            </svg>
                        </a>
                        <a  class="cursor-pointer border-radius-circle transition-bg-3s container-ways-of-communication__github-link container-ways-of-communication__links center">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24" class="container-ways-of-communication__github-link-svg container-ways-of-communication__svgs cursor-pointer" height="1em" width="1em">
                                <title></title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                            </svg>
                        </a>
                        <a  class="cursor-pointer border-radius-circle transition-bg-3s container-ways-of-communication__telegram-link container-ways-of-communication__links center">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24" class="container-ways-of-communication__telegram-link-svg container-ways-of-communication__svgs cursor-pointer" height="1em" width="1em">
                                <title></title><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path>
                            </svg>
                        </a>
                        <a  class="cursor-pointer border-radius-circle transition-bg-3s container-ways-of-communication__youtube-link container-ways-of-communication__links center">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24" class="container-ways-of-communication__youtube-link-svg container-ways-of-communication__svgs cursor-pointer" height="1em" width="1em">
                                <title></title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                            </svg>
                        </a>
                    </div>
                </article>

                <article class="container-links-about-site">
                    <div class="container-sections-of-the-site-links">
                        <div class="sections-of-the-site-links">
                            <h3 class="sections-of-the-site-links__title">بخش‌های سایت</h3>
                            <ul class="menu-sections-of-the-site-links">
                                <li class="sections-of-the-site-links__list-item footer-list-item">
                                    <a href="#" class="footer-link transition-color-3s sections-of-the-site-links__link">دوره‌های آموزشی</a>
                                </li>
                                <li class="sections-of-the-site-links__list-item footer-list-item">
                                    <a href="#" class="footer-link transition-color-3s sections-of-the-site-links__link">بلاگ‌های آموزشی</a>
                                </li>
                                <li class="sections-of-the-site-links__list-item footer-list-item">
                                    <a href="#" class="footer-link transition-color-3s sections-of-the-site-links__link">درباره ما</a>
                                </li>
                                <li class="sections-of-the-site-links__list-item footer-list-item">
                                    <a href="#" class="footer-link transition-color-3s sections-of-the-site-links__link">شروع یادگیری</a>
                                </li>
                            </ul>
                        </div>

                        <div class="education-courses">
                            <h3 class="education-courses__title">دوره‌های آمورشی</h3>
                            <ul class="menu-sections-of-the-site-links">
                                <li class="education-courses__list-item footer-list-item">
                                    <a href="#" class="footer-link transition-color-3s education-courses__link">دوره متخصص ریکت و ریداکس</a>
                                </li>
                                <li class="education-courses__list-item footer-list-item">
                                    <a href="#" class="footer-link transition-color-3s education-courses__link">دوره متخصص Next.js</a>
                                </li>
                                <li class="education-courses__list-item footer-list-item">
                                    <a href="#" class="footer-link transition-color-3s education-courses__link">دوره پیشرفته جاوااسکریپت</a>
                                </li>
                                <li class="education-courses__list-item footer-list-item">
                                    <a href="#" class="footer-link transition-color-3s education-courses__link">دوره پروژه محور تیلویند</a>
                                </li>
                                <li class="education-courses__list-item footer-list-item">
                                    <a href="#" class="footer-link transition-color-3s education-courses__link">دوره طراحی وب رسپانسیو</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>

                <article class="containet-zarinpal">
                    <img src="./imgs/zarinpal.svg" alt="zarinpal">
                </article>

            </div>
            <p class="footer-copy-right">© تمامی حقوق برای فرانت هوکس محفوظ است</p>
`

class FooterSite extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode:'open'})
        this.shadowRoot.append(template.content.cloneNode(true))
    }
}

export { FooterSite }