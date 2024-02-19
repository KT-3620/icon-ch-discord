export async function wait(s: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, s * 1000);
  });
}
