export default function App() {
  const { useEffect } = this;

  useEffect(() => {
    console.log("---앱 시작---");
  }, []);

  return {
    css: `
      .AppInner {
        color: yellow;
      }
    `,
    jsx: `
    <div class="AppInner" >
      <h1>앱부분</h1>
      <Count></Count>
    </div>
    `,
  };
}
