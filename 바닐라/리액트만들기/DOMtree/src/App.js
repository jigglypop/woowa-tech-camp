const App = () => {
  return {
    render: `
        <div id="hello" class="box close" style="hidden">
            <h1 id="h1">App에 오신걸 환영합니다</h1>
            <div>
                <div>
                <h2>메인목록</h2>
                <Main/>
                <Main/>
                <Main/>
                </div>
            </div>
        </div>`,
  };
};
export default App;
