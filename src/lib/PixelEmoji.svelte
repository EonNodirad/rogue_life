<script lang="ts">
    let { char, size = 20 }: { char: string; size?: number } = $props();

    const BASE = 16;
    let canvas = $state<HTMLCanvasElement | null>(null);

    $effect(() => {
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;
        ctx.clearRect(0, 0, BASE, BASE);
        ctx.font = `${BASE - 2}px serif`;
        ctx.textBaseline = 'top';
        ctx.fillText(char, 0, 1);
    });
</script>

<canvas
    bind:this={canvas}
    width={BASE}
    height={BASE}
    style="width:{size}px; height:{size}px; image-rendering:pixelated; vertical-align:middle; display:inline-block;"
/>
