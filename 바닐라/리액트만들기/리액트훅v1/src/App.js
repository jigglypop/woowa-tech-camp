export default function App() {
  const { useState, useEffect } = this;

  useEffect(() => {
    console.log("---앱 시작---");
  }, []);

  return {
    jsx: `
      <h1>앱부분</h1>
      <Count></Count>
    `,
  };
}
