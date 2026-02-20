import React, { useEffect, useRef } from 'react';

const FallingPetals: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const petals: Petal[] = [];
        const petalCount = 40; // Reduced count for subtle effect

        class Petal {
            x: number;
            y: number;
            size: number;
            speed: number;
            oscillation: number;
            angle: number;
            opacity: number;
            color: string;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height - height;
                this.size = Math.random() * 10 + 5;
                this.speed = Math.random() * 1.5 + 0.5;
                this.oscillation = Math.random() * 2;
                this.angle = 0;
                this.opacity = Math.random() * 0.5 + 0.3;
                // Soft pink/peach colors
                const colors = ['#ffd1dc', '#ffb7b2', '#ffe4e1'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.y += this.speed;
                this.angle += 0.01;
                this.x += Math.sin(this.angle) * this.oscillation;

                if (this.y > height) {
                    this.y = -20;
                    this.x = Math.random() * width;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                // Draw a simple oval shape rotated
                ctx.ellipse(this.x, this.y, this.size / 2, this.size, this.angle, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }
        }

        for (let i = 0; i < petalCount; i++) {
            petals.push(new Petal());
        }

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            petals.forEach((petal) => {
                petal.update();
                petal.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-30"
            style={{ mixBlendMode: 'multiply' }}
        />
    );
};

export default FallingPetals;
