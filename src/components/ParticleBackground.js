import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		let mounted = true;

		initParticlesEngine(async (engine) => {
			await loadSlim(engine);
		}).then(() => {
			if (mounted) setReady(true);
		});

		return () => {
			mounted = false;
		};
	}, []);

	const options = useMemo(
		() => ({
			background: {
				color: { value: "transparent" },
			},
			fullScreen: {
				enable: false,
			},
			fpsLimit: 60,
			detectRetina: true,
			interactivity: {
				events: {
					resize: true,
				},
			},
			particles: {
				number: {
					value: 70,
					density: { enable: true, area: 900 },
				},
				color: { value: ["#ffffff", "#dbeafe", "#fde68a"] },
				links: {
					enable: true,
					color: "#ffffff",
					distance: 130,
					opacity: 0.15,
					width: 1,
				},
				move: {
					enable: true,
					speed: 1.2,
					direction: "none",
					outModes: { default: "out" },
				},
				opacity: { value: 0.6 },
				size: { value: { min: 1, max: 3 } },
			},
		}),
		[]
	);

	if (!ready) return null;

	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				zIndex: 0,
				pointerEvents: "none",
			}}
			aria-hidden="true"
		>
			<Particles
				id="tsparticles"
				options={options}
				style={{ width: "100%", height: "100%" }}
			/>
		</div>
	);
}

