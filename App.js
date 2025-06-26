const { useState, useEffect, useRef } = React;

function App() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const buttonRef = useRef(null);

    // Toggle burger menu
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    // Header link hover animation
    const handleNavHover = (e, enter) => {
        const link = e.target;
        if (enter) {
            link.style.transform = 'scale(1.1)';
            link.style.color = '#9F7AEA';
        } else {
            link.style.transform = 'scale(1)';
            link.style.color = '#FFFFFF';
        }
    };

    // Portrait animation
    const portraitRef = useRef(null);
    useEffect(() => {
        const portrait = portraitRef.current;
        if (!portrait) return;

        let opacity = 0;
        let scale = 0.8;
        const glow = portrait.querySelector('.portrait-glow');

        const animatePortrait = () => {
            if (opacity < 1) {
                opacity += 0.02;
                scale += 0.004;
                portrait.style.opacity = opacity;
                portrait.style.transform = `scale(${scale})`;
                glow.style.opacity = opacity * 0.5;
                requestAnimationFrame(animatePortrait);
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(animatePortrait);
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(portrait);
        return () => observer.disconnect();
    }, []);

    // Button letter animation
    const handleButtonHover = (e, enter) => {
        const button = buttonRef.current;
        if (!button) return;

        const letters = button.querySelectorAll('.letter-span');
        letters.forEach((letter, index) => {
            if (enter) {
                setTimeout(() => {
                    letter.style.transform = 'translateY(-5px)';
                    setTimeout(() => {
                        letter.style.transform = 'translateY(0)';
                    }, 200);
                }, index * 100);
            } else {
                letter.style.transform = 'translateY(0)';
            }
        });
    };

    // Scroll animation for sections
    useEffect(() => {
        const animateElements = document.querySelectorAll('.animate-slide-in');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        let opacity = 0;
                        let y = 50;
                        const animate = () => {
                            if (opacity < 1) {
                                opacity += 0.02;
                                y -= 1;
                                entry.target.style.opacity = opacity;
                                entry.target.style.transform = `translateY(${y}px)`;
                                requestAnimationFrame(animate);
                            }
                        };
                        requestAnimationFrame(animate);
                    }
                });
            },
            { threshold: 0.2 }
        );

        animateElements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* Social Media Sidebar */}
            <aside className="social-sidebar fixed z-15">
                <a href="https://facebook.com" target="_blank" className="social-icon text-white text-2xl">
                    <i class="bxl bx-facebook bx-flashing " />
                </a>
                <a href="https://linkedin.com" target="_blank" className="social-icon text-white text-2xl">
                    < i class='bxl  bx-linkedin'  ></i> 
                </a>
                <a href="https://github.com" target="_blank" className="social-icon text-white text-2xl">
                    < i class='bxl  bx-github'  ></i> 
                </a>
                <a href="https://instagram.com" target="_blank" className="social-icon text-white text-2xl">
                    < i class='bxl  bx-instagram'  ></i> 
                </a>
            </aside>

            {/* Header */}
            <header className="main-header bg-gray-800 shadow-lg fixed w-full z-20">
                <div className="container mx-auto px-8 py-6 flex justify-between items-center">
                    <div className="logo">
                        <a href="#"><h1 className="text-4xl font-bold text-white-400">MyWeBSite</h1></a>
                    </div>
                    <button
                        className="burger text-3xl md:hidden z-30"
                        aria-label="Ouvrir le menu"
                        onClick={toggleNav}
                    >
                        {isNavOpen ? '✕' : '☰'}
                    </button>
                    <nav className={`nav ${isNavOpen ? 'active' : ''}`}>
                        <ul className="nav-links flex flex-col md:flex-row md:space-x-8">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-indigo-400 transition text-lg"
                                    onMouseEnter={(e) => handleNavHover(e, true)}
                                    onMouseLeave={(e) => handleNavHover(e, false)}
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-indigo-400 transition text-lg"
                                    onMouseEnter={(e) => handleNavHover(e, true)}
                                    onMouseLeave={(e) => handleNavHover(e, false)}
                                >
                                    Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-indigo-400 transition text-lg"
                                    onMouseEnter={(e) => handleNavHover(e, true)}
                                    onMouseLeave={(e) => handleNavHover(e, false)}
                                >
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-indigo-400 transition text-lg"
                                    onMouseEnter={(e) => handleNavHover(e, true)}
                                    onMouseLeave={(e) => handleNavHover(e, false)}
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Banner Section */}
            <section className="ban_section min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-indigo-600 py-20">
                <div className="container mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
                    <div
                        className="ban_section-img md:w-1/2 animate-slide-in portrait-container"
                        ref={portraitRef}
                        style={{ opacity: 0, transform: 'scale(0.8)' }}
                    >
                        <div className="portrait-glow"></div>
                        <img
                            src="Pictures/Photo.png"
                            alt="Profile"
                            className="rounded-lg shadow-lg w-full max-w-md mx-auto"
                        />
                    </div>
                    <div className="ban_section-text md:w-1/2 text-center md:text-left mt-12 md:mt-0 animate-slide-in">
                        <div className="ban_section-text1 text-4xl md:text-4xl font-bold leading-tight">
                            WELCOME to <span className="ban_section-text-special text-indigo-300">MyWeBSite</span>
                        </div>
                        <div className="ban_section-text2 text-4xl md:text-5xl mt-8">
                            I'M <span className="ban_section-text-special text-indigo-300 font-bold">JORIS</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Second Section */}
            <section className="ban_section-2 py-24 bg-gray-800">
                <div className="container mx-auto px-8 text-center">
                    <div className="ban_section-text animate-slide-in">
                        <span className="ban_section-text-special text-3xl md:text-4xl font-semibold text-indigo-400">
                            DEVELOPER / MUSICIAN
                        </span>
                    </div>
                    <div className="ban_section-text mt-8 animate-slide-in">
                        <p className="text-xl md:text-2xl">Gain even more experience. That's my motto!</p>
                    </div>
                    <div className="ban_section-text-button mt-12 animate-slide-in">
                        <a href="#">
                            <button
                                ref={buttonRef}
                                className="btn-1 bg-indigo-500 text-white px-8 py-4 rounded-full shadow-lg hover:bg-indigo-600 transition relative overflow-hidden text-lg"
                                onMouseEnter={(e) => handleButtonHover(e, true)}
                                onMouseLeave={(e) => handleButtonHover(e, false)}
                            >
                                <div className="original font-bold">Signup</div>
                                <div className="letters absolute inset-0 flex justify-center items-center space-x-1 font-bold">
                                    {['S', 'I', 'G', 'N', 'U', 'P'].map((letter, index) => (
                                        <span key={index} className="letter-span">
                                            {letter}
                                        </span>
                                    ))}
                                </div>
                            </button>
                        </a>
                    </div>
                </div>
            </section>

            <section className="footer-section bg-gray-900 py-12">
                <div className="container mx-auto px-8 text-center">
                    <p className="text-gray-400 text-lg">© 2025 MyWeBSite by Joris. All rights reserved.</p>
                </div>
                <div className="container flex right-0 align-items justify-content items-center gap-5">
                    <a href="https://facebook.com" target="_blank" className="social-icon text-white text-2xl">
                        <i class="bxl bx-facebook bx-flashing " />
                    </a>
                    <a href="https://linkedin.com" target="_blank" className="social-icon text-white text-2xl">
                        < i class='bxl  bx-linkedin'  ></i> 
                    </a>
                    <a href="https://github.com" target="_blank" className="social-icon text-white text-2xl">
                        < i class='bxl  bx-github'  ></i> 
                    </a>
                    <a href="https://instagram.com" target="_blank" className="social-icon text-white text-2xl">
                        < i class='bxl  bx-instagram'  ></i> 
                    </a>
                </div>
            </section>
        </>
    );
}

// Render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);