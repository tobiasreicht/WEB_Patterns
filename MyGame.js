// MyGame - Example implementation of Game interface
import { Game } from "./GameFramework.js";
class MyGame extends Game {
    constructor() {
        super(...arguments);
        this.canvasWidth = 800;
        this.canvasHeight = 600;
        this.boxWidth = 440;
        this.boxHeight = 320;
        this.radius = 14;
        this.goalHits = 10;
        this.startTimeSeconds = 45;
        this.x = this.canvasWidth / 2;
        this.y = this.canvasHeight / 2;
        this.vx = 240;
        this.vy = 180;
        this.speed = Math.hypot(240, 180);
        this.rotation = 0;
        this.rotationSpeed = 2.8;
        this.keys = {};
        this.hits = 0;
        this.streak = 0;
        this.level = 1;
        this.timeLeft = this.startTimeSeconds;
        this.state = "running";
        this.targetCornerIndex = 0;
        this.targetPulse = 0;
        this.hitFlashTime = 0;
        this.shakeTime = 0;
        this.elapsed = 0;
        this.particles = [];
        this.localBestKey = "corner-hit-best";
        this.scoreEl = null;
        this.streakEl = null;
        this.levelEl = null;
        this.timerEl = null;
        this.statusEl = null;
        this.targetEl = null;
        this.bestEl = null;
        this.panelEl = null;
        this.bestScore = 0;
    }
    getBoxCorners() {
        const cx = this.canvasWidth / 2;
        const cy = this.canvasHeight / 2;
        const cos = Math.cos(this.rotation);
        const sin = Math.sin(this.rotation);
        const corners = [
            [cx - this.boxWidth / 2, cy - this.boxHeight / 2],
            [cx + this.boxWidth / 2, cy - this.boxHeight / 2],
            [cx + this.boxWidth / 2, cy + this.boxHeight / 2],
            [cx - this.boxWidth / 2, cy + this.boxHeight / 2],
        ];
        return corners.map(([x, y]) => {
            const tx = x - cx;
            const ty = y - cy;
            const rotX = tx * cos - ty * sin;
            const rotY = tx * sin + ty * cos;
            return [rotX + cx, rotY + cy];
        });
    }
    triggerWin(hitX, hitY) {
        this.hits++;
        this.lastHitTime = 0;
        // Create particle burst
        for (let i = 0; i < 20; i++) {
            const angle = (Math.PI * 2 * i) / 20;
            const speed = 300;
            this.particles.push({
                x: hitX,
                y: hitY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0.6,
                maxLife: 0.6,
            });
        }
    }
    updateHud() {
        if (this.scoreEl)
            this.scoreEl.textContent = String(this.hits);
        if (this.streakEl)
            this.streakEl.textContent = String(this.streak);
        if (this.levelEl)
            this.levelEl.textContent = String(this.level);
        if (this.timerEl)
            this.timerEl.textContent = this.timeLeft.toFixed(1);
        if (this.bestEl)
            this.bestEl.textContent = String(this.bestScore);
        if (this.targetEl) {
            const labels = ["Top Left", "Top Right", "Bottom Right", "Bottom Left"];
            this.targetEl.textContent = labels[this.targetCornerIndex];
        }
        if (this.statusEl) {
            if (this.state === "won") {
                this.statusEl.textContent = "WIN - Press R to play again";
            }
            else if (this.state === "over") {
                this.statusEl.textContent = "Time up - Press R to retry";
            }
            else if (this.state === "paused") {
                this.statusEl.textContent = "Paused";
            }
            else {
                this.statusEl.textContent = "Hit the glowing corner";
            }
        }
    }
    setState(next) {
        this.state = next;
        if (this.panelEl) {
            const classes = ["is-running", "is-paused", "is-won", "is-over"];
            this.panelEl.classList.remove(...classes);
            this.panelEl.classList.add(`is-${next}`);
        }
        this.updateHud();
    }
    chooseNextTarget() {
        let next = this.targetCornerIndex;
        while (next === this.targetCornerIndex) {
            next = Math.floor(Math.random() * 4);
        }
        this.targetCornerIndex = next;
    }
    spawnBurst(x, y, hue, count) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.15;
            const speed = 140 + Math.random() * 260;
            this.particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0.9,
                maxLife: 0.9,
                size: 2 + Math.random() * 4,
                hue,
            });
        }
    }
    resetBall(inwardFrom) {
        this.x = this.canvasWidth / 2;
        this.y = this.canvasHeight / 2;
        let angle = Math.random() * Math.PI * 2;
        if (inwardFrom) {
            const [cx, cy] = [this.canvasWidth / 2, this.canvasHeight / 2];
            angle = Math.atan2(cy - inwardFrom[1], cx - inwardFrom[0]);
            angle += (Math.random() - 0.5) * 0.6;
        }
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
    }
    triggerCornerHit(hitX, hitY) {
        this.x = 400;
        this.streak++;
        this.level = 1 + Math.floor(this.hits / 3);
        this.speed = Math.min(520, 260 + this.hits * 18);
        this.hitFlashTime = 0.5;
        this.shakeTime = 0.35;
        this.spawnBurst(hitX, hitY, 48, 36);
        this.bestScore = Math.max(this.bestScore, this.hits);
        localStorage.setItem(this.localBestKey, String(this.bestScore));
        if (this.hits >= this.goalHits) {
            this.setState("won");
            this.spawnBurst(this.canvasWidth / 2, this.canvasHeight / 2, 140, 80);
            this.updateHud();
            return;
            this.chooseNextTarget();
            this.resetBall([hitX, hitY]);
            this.updateHud();
            // Check edge collision (bounce but don't win)
            const edges = [
                private, closestPointOnSegment(p, Vec2, a, Vec2, b, Vec2), Vec2, {
                    const: abx = b[0] - a[0],
                    const: aby = b[1] - a[1],
                    const: apx = p[0] - a[0],
                    const: apy = p[1] - a[1],
                    const: abLenSq = abx * abx + aby * aby,
                    if(abLenSq) { }
                } === 0
            ];
            return a;
            const t = Math.max(0, Math.min(1, (apx * abx + apy * aby) / abLenSq));
            return [a[0] + abx * t, a[1] + aby * t];
        }
    }
    resolveBoxPhysics() {
        [corners[1], corners[2]],
        ;
        const targetCorner = corners[this.targetCornerIndex];
        const cornerDx = this.x - targetCorner[0];
        const cornerDy = this.y - targetCorner[1];
        const cornerDist = Math.hypot(cornerDx, cornerDy);
        if (cornerDist <= this.radius + 6) {
            this.triggerCornerHit(targetCorner[0], targetCorner[1]);
            return;
        }
        const edges = [
            [corners[0], corners[1]],
            [corners[1], corners[2]],
            [corners[2], corners[3]],
            [corners[3], corners[0]],
        ];
        let bestDist = Number.POSITIVE_INFINITY;
        let bestPoint = [this.x, this.y];
        let bestEdge = null;
        for (const edge of edges) {
            const point = this.closestPointOnSegment([this.x, this.y], edge[0], edge[1]);
            const dx = this.x - point[0];
            const dy = this.y - point[1];
            const dist = Math.hypot(dx, dy);
            if (dist < bestDist) {
                bestDist = dist;
                bestPoint = point;
                bestEdge = edge;
            }
        }
        if (!bestEdge || bestDist >= this.radius)
            return;
        let nx = this.x - bestPoint[0];
        let ny = this.y - bestPoint[1];
        const nLen = Math.hypot(nx, ny);
        if (nLen < 0.0001) {
            const ex = bestEdge[1][0] - bestEdge[0][0];
            const ey = bestEdge[1][1] - bestEdge[0][1];
            nx = -ey;
            ny = ex;
            const testToCenterX = this.canvasWidth / 2 - bestPoint[0];
            const testToCenterY = this.canvasHeight / 2 - bestPoint[1];
            if (nx * testToCenterX + ny * testToCenterY < 0) {
                nx = -nx;
                ny = -ny;
            }
        }
        const invLen = 1 / Math.hypot(nx, ny);
        nx *= invLen;
        ny *= invLen;
        const pushOut = this.radius - bestDist + 0.1;
        this.x += nx * pushOut;
        this.y += ny * pushOut;
        const dot = this.vx * nx + this.vy * ny;
        if (dot < 0) {
            this.vx -= 2 * dot * nx;
            this.vy -= 2 * dot * ny;
            const jitter = (Math.random() - 0.5) * 0.18;
            const angle = Math.atan2(this.vy, this.vx) + jitter;
            this.vx = Math.cos(angle) * this.speed;
            this.vy = Math.sin(angle) * this.speed;
            this.streak = 0;
            this.updateHud();
        }
    }
    resetGame() {
        this.hits = 0;
        this.streak = 0;
        this.level = 1;
        this.timeLeft = this.startTimeSeconds;
        this.rotation = 0;
        this.speed = Math.hypot(240, 180);
        this.targetCornerIndex = Math.floor(Math.random() * 4);
        this.particles = [];
        this.hitFlashTime = 0;
        this.shakeTime = 0;
        this.elapsed = 0;
        this.resetBall();
        this.setState("running");
        this.updateHud();
    }
    init() {
        this.scoreEl = document.getElementById("score");
        this.streakEl = document.getElementById("streak");
        this.levelEl = document.getElementById("level");
        this.timerEl = document.getElementById("timer");
        this.statusEl = document.getElementById("status");
        this.targetEl = document.getElementById("target");
        this.bestEl = document.getElementById("best");
        this.panelEl = document.getElementById("hudPanel");
        const storedBest = Number(localStorage.getItem(this.localBestKey) ?? "0");
        this.bestScore = Number.isFinite(storedBest) ? storedBest : 0;
        document.addEventListener("keydown", (e) => {
            this.keys[e.key] = true;
            if (e.key === " ") {
                if (this.state === "running")
                    this.setState("paused");
                else if (this.state === "paused")
                    this.setState("running");
            }
            if (e.key.toLowerCase() === "r") {
                this.resetGame();
            }
        });
        document.addEventListener("keyup", (e) => {
            this.keys[e.key] = false;
        });
        this.resetGame();
    }
    update(deltaTime) {
        this.elapsed += deltaTime;
        this.targetPulse += deltaTime * 3.2;
        if (this.hitFlashTime > 0)
            this.hitFlashTime -= deltaTime;
        if (this.shakeTime > 0)
            this.shakeTime -= deltaTime;
        this.particles = this.particles.filter((p) => {
            p.life -= deltaTime;
            p.x += p.vx * deltaTime;
            p.y += p.vy * deltaTime;
            p.vy += 220 * deltaTime;
            p.vx *= 0.992;
            p.vy *= 0.995;
            return p.life > 0;
        });
        if (this.state !== "running") {
            this.updateHud();
            return;
        }
        if (this.keys["ArrowLeft"] || this.keys["a"] || this.keys["A"]) {
            this.rotation -= this.rotationSpeed * deltaTime;
        }
        if (this.keys["ArrowRight"] || this.keys["d"] || this.keys["D"]) {
            this.rotation += this.rotationSpeed * deltaTime;
        }
        this.timeLeft = Math.max(0, this.timeLeft - deltaTime);
        if (this.timeLeft <= 0) {
            this.setState("over");
            this.spawnBurst(this.canvasWidth / 2, this.canvasHeight / 2, 12, 50);
            return;
        }
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
        this.resolveBoxPhysics();
        this.updateHud();
    }
    render(ctx) {
        const gradient = ctx.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
        gradient.addColorStop(0, "#020617");
        gradient.addColorStop(1, "#07152f");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const glow = Math.max(0, this.hitFlashTime / 0.5);
        ctx.save();
        if (this.shakeTime > 0) {
            const amp = this.shakeTime * 5;
            ctx.translate((Math.random() - 0.5) * amp, (Math.random() - 0.5) * amp);
        }
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.rotate(this.rotation);
        ctx.strokeStyle = `rgba(148, 163, 184, ${0.5 + glow * 0.4})`;
        ctx.lineWidth = 2 + glow * 3;
        ctx.shadowColor = `rgba(251, 191, 36, ${glow * 0.9})`;
        ctx.shadowBlur = 24 * glow;
        ctx.strokeRect(-this.boxWidth / 2, -this.boxHeight / 2, this.boxWidth, this.boxHeight);
        const targetCorners = [
            [-this.boxWidth / 2, -this.boxHeight / 2],
            [this.boxWidth / 2, -this.boxHeight / 2],
            [this.boxWidth / 2, this.boxHeight / 2],
            [-this.boxWidth / 2, this.boxHeight / 2],
        ];
        const [tx, ty] = targetCorners[this.targetCornerIndex];
        const pulse = 8 + Math.sin(this.targetPulse) * 3;
        ctx.fillStyle = "rgba(251, 191, 36, 0.95)";
        ctx.beginPath();
        ctx.arc(tx, ty, pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        for (const p of this.particles) {
            const alpha = p.life / p.maxLife;
            ctx.fillStyle = `hsla(${p.hue}, 92%, 58%, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.fillStyle = "#0ea5e9";
        ctx.shadowColor = "rgba(14, 165, 233, 0.55)";
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        if (this.state === "won" || this.state === "over") {
            const overlay = ctx.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
            overlay.addColorStop(0, "rgba(2, 6, 23, 0.72)");
            overlay.addColorStop(1, "rgba(15, 23, 42, 0.85)");
            ctx.fillStyle = overlay;
            ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
            const wobble = Math.sin(this.elapsed * 5) * 4;
            ctx.fillStyle = this.state === "won" ? "#fbbf24" : "#fb7185";
            ctx.font = "700 56px Trebuchet MS";
            ctx.textAlign = "center";
            ctx.fillText(this.state === "won" ? "YOU WIN" : "TIME UP", this.canvasWidth / 2, 260 + wobble);
            ctx.fillStyle = "#e2e8f0";
            ctx.font = "600 22px Trebuchet MS";
            ctx.fillText(this.state === "won"
                ? `Final score ${this.hits}/${this.goalHits}`
                : `Final score ${this.hits}`, this.canvasWidth / 2, 305);
            ctx.font = "500 18px Trebuchet MS";
            ctx.fillText("Press R to restart", this.canvasWidth / 2, 338);
            ctx.textAlign = "start";
        }
    }
}
