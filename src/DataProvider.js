export function getSomeAsnyncValue() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("I am a nice value: " + Date.now()), 200);
    })
}

export async function getSomeAsnyncValue1() {
    await setTimeout(300);
    return "I am a nice value: " + Date.now();
}
