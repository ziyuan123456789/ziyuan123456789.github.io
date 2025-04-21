function Square({ value, onSquareClick }) {
    return /* @__PURE__ */ Dong.createElement(
        "button",
        {
            style: {
                width: "50px",
                height: "50px",
                backgroundColor: "#f4f4f4",
                border: "1px solid #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                cursor: "pointer",
                transition: "background-color 0.3s ease"
            },
            onClick: onSquareClick
        },
        value
    );
}
function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }
    return /* @__PURE__ */ Dong.createElement("div", { style: { display: "flex", flexDirection: "column", marginBottom: "20px" } }, /* @__PURE__ */ Dong.createElement("div", { style: { fontSize: "20px", marginBottom: "20px" } }, status), /* @__PURE__ */ Dong.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: "5px" } }, /* @__PURE__ */ Dong.createElement(Square, { value: squares[0], onSquareClick: () => handleClick(0) }), /* @__PURE__ */ Dong.createElement(Square, { value: squares[1], onSquareClick: () => handleClick(1) }), /* @__PURE__ */ Dong.createElement(Square, { value: squares[2], onSquareClick: () => handleClick(2) })), /* @__PURE__ */ Dong.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: "5px" } }, /* @__PURE__ */ Dong.createElement(Square, { value: squares[3], onSquareClick: () => handleClick(3) }), /* @__PURE__ */ Dong.createElement(Square, { value: squares[4], onSquareClick: () => handleClick(4) }), /* @__PURE__ */ Dong.createElement(Square, { value: squares[5], onSquareClick: () => handleClick(5) })), /* @__PURE__ */ Dong.createElement("div", { style: { display: "flex", justifyContent: "center" } }, /* @__PURE__ */ Dong.createElement(Square, { value: squares[6], onSquareClick: () => handleClick(6) }), /* @__PURE__ */ Dong.createElement(Square, { value: squares[7], onSquareClick: () => handleClick(7) }), /* @__PURE__ */ Dong.createElement(Square, { value: squares[8], onSquareClick: () => handleClick(8) })));
}
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
function App() {
    const divRef = Dong.useRef(null);
    const [position, setPosition] = Dong.useState({
        x: 0,
        y: 0
    });
    const [history, setHistory] = Dong.useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = Dong.useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    const [elements, setElements] = Dong.useState([1, 2, 3, 4, 5]);
    const [data, setData] = Dong.useState(114514);
    const [backgroundColor, setBackgroundColor] = Dong.useState("");
    const [xData, setXData] = Dong.useState([]);
    const [yData, setYData] = Dong.useState([]);
    const [vDomString] = Dong.useAware();
    const inputRef = Dong.useRef(null);
    const chartRef = Dong.useRef(null);
    const handlePointerMove = Dong.useCallBack((e) => {
        const divRect = divRef.current.getBoundingClientRect();
        const x = e.clientX - divRect.left;
        const y = e.clientY - divRect.top;
        setPosition({ x, y });
    }, []);
    const handlePlay = Dong.useCallBack((nextSquares) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }, [history, currentMove]);
    const handleRef = Dong.useCallBack(() => {
        alert(inputRef.current?.value);
    }, []);
    Dong.useEffect(() => {
        const realDomContainer2 = document.getElementById("realdom");
        if (realDomContainer2) {
            realDomContainer2.innerHTML = `
        <h1>\u865A\u62DF DOM \u5C55\u793A</h1>
        <h5>\u6765\u81EAuseEffect\u7684\u6D88\u606F:\u8FD9\u662F\u4E00\u4E2A\u7A7A\u6570\u7EC4\u4F9D\u8D56useEffect, \u9875\u9762\u52A0\u8F7D\u4F1A\u8FD0\u884C\u4E00\u6B21</h5>
        <div>\u8FD9\u6BB5\u5185\u5BB9\u5DF2\u8131\u79BB\u865A\u62DFDOM\u7BA1\u7406,MiniReact\u65E0\u6CD5\u611F\u77E5\u5230\u8FD9\u90E8\u5206\u7684\u53D8\u5316</div>
        <pre>${Dong.useAware()[0]}</pre>`;
        }
        return () => {
            console.log("\u6E05\u7406\u526F\u4F5C\u7528");
        };
    }, []);
    const testFunction = () => {
        console.log("\u611A\u8822\u7684\u7684MiniReact\u5E76\u4E0D\u77E5\u9053\u51FD\u6570\u5230\u5E95\u53D8\u4E86\u6CA1");
    };
    const testFunctionWithUseCallBack = Dong.useCallBack(() => {
        console.log("\u611A\u8822\u7684\u7684MiniReact\u8FD8\u662F\u5E76\u4E0D\u77E5\u9053\u51FD\u6570\u5230\u5E95\u53D8\u4E86\u6CA1,\u6240\u4EE5\u4ED6\u6253\u7B97\u5F15\u5165\u4E00\u4E9B\u5916\u63F4");
    }, []);
    const [functionHandler] = Dong.useState(testFunction);
    const [functionHandlerWithUseCallBack] = Dong.useState(testFunctionWithUseCallBack);
    Dong.useEffect(() => {
        if (testFunction === functionHandler) {
            console.log("\u7B2C\u4E00\u6B21\u8FD0\u884C,\u6240\u4EE5\u5F15\u7528\u76F8\u540C");
        } else {
            console.log("\u4EC0\u4E48\u4E8B\u60C5\u90FD\u662F\u7B2C\u4E00\u6B21\u597D,\u7B2C\u4E8C\u6B21\u5C31\u4E0D\u662F\u4E00\u4E2A\u611F\u89C9\u4E86");
        }
    });
    Dong.useEffect(() => {
        if (testFunctionWithUseCallBack === functionHandlerWithUseCallBack) {
            console.log("useCallBack\u751F\u6548\u4E2D");
        } else {
            console.log("useCallBack\u5931\u6548\u4E86");
        }
    });
    Dong.useEffect(() => {
        const realDomContainer2 = document.getElementById("realdom");
        if (realDomContainer2) {
            realDomContainer2.innerHTML = `
        <h2>\u865A\u62DF DOM \u5C55\u793A</h2>
        <div>\u8FD9\u6BB5\u5185\u5BB9\u5DF2\u8131\u79BB\u865A\u62DFDOM\u7BA1\u7406,MiniReact\u65E0\u6CD5\u611F\u77E5\u5230\u8FD9\u90E8\u5206\u7684\u53D8\u5316</div>
        <pre>${Dong.useAware()[0]}</pre>
    `;
        }
    }, [vDomString]);
    Dong.useEffect(() => {
        const realDomContainer2 = document.getElementById("realdom");
        if (realDomContainer2) {
            realDomContainer2.innerHTML = `
        <h1>\u865A\u62DF DOM \u5C55\u793A</h1>
        <h5>\u6765\u81EAuseEffect\u7684\u6D88\u606F:\u8FD9\u4E2AuseEffect\u4F9D\u8D56\u4E8Edata, \u9875\u9762\u52A0\u8F7D\u4F1A\u8FD0\u884C\u4E00\u6B21, data\u53D8\u52A8\u65F6\u4E5F\u4F1A\u89E6\u53D1\uFF0C\u5F53\u524D\u503C\u4E3A ${data}</h5>
        <div>\u8FD9\u6BB5\u5185\u5BB9\u5DF2\u8131\u79BB\u865A\u62DFDOM\u7BA1\u7406,MiniReact\u65E0\u6CD5\u611F\u77E5\u5230\u8FD9\u90E8\u5206\u7684\u53D8\u5316</div>
        <pre>${Dong.useAware()[0]}</pre>`;
        }
        return () => {
            console.log("\u6E05\u7406\u526F\u4F5C\u7528");
        };
    }, [data]);
    const generateRandomColor = Dong.useCallBack(() => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }, []);
    const handleClick = Dong.useCallBack(() => {
        setData((temp) => temp + 1);
        setBackgroundColor(generateRandomColor());
    }, [generateRandomColor]);
    Dong.useEffect(() => {
        setTimeout(() => {
            const chartDom = chartRef.current;
            if (!chartDom) return;
            const myChart = echarts.init(chartDom);
            setXData(() => [...xData, 1]);
            setYData(() => [...xData, 1]);
            const option = {
                xAxis: {
                    type: "category",
                    data: xData
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        data: yData,
                        type: "bar"
                    }
                ]
            };
            myChart.setOption(option);
            return () => {
                myChart.dispose();
            };
        }, 0);
    }, [data]);
    return /* @__PURE__ */ Dong.createElement("div", { id: "app" }, /* @__PURE__ */ Dong.createElement(
        "h1",
        {
            style: { backgroundColor, transition: "background 0.5s" },
            onClick: handleClick
        },
        "MiniReact - \u70B9\u51FB\u89E6\u53D1\u4E00\u6B21 useState"
    ), /* @__PURE__ */ Dong.createElement("h2", null, "\u6253\u5F00F12\u67E5\u770BMiniReact\u5DE5\u4F5C\u8BE6\u60C5 \u5F53\u5DEE\u5F02\u51FA\u73B0\u4F1A\u7ED8\u5236\u4E00\u4E2A\u6DE1\u84DD\u8272\u7684\u8FB9\u6846\u5305\u88F9\u4F4F\u66F4\u65B0\u7684\u5143\u7D20"), /* @__PURE__ */ Dong.createElement("h2", null, data), /* @__PURE__ */ Dong.createElement("h2", null, "\u6765\u8BD5\u4E00\u4E0B\u4E95\u5B57\u68CB\u6E38\u620F,\u56DE\u5473\u4E00\u4E0BReact\u5B98\u7F51\u7684\u6559\u7A0B"), /* @__PURE__ */ Dong.createElement("div", { className: "game" }, /* @__PURE__ */ Dong.createElement("div", { className: "game-board" }, /* @__PURE__ */ Dong.createElement(Board, { xIsNext, squares: currentSquares, onPlay: handlePlay }))), /* @__PURE__ */ Dong.createElement("h2", null, "\u6765\u8BD5\u4E00\u4E0B\u79FB\u52A8\u5C0F\u7403"), /* @__PURE__ */ Dong.createElement("h2", null, "MiniReact\u901A\u8FC7\u66F4\u6539className\u6765\u6807\u8BB0\u53D8\u52A8\u7684\u8282\u70B9,\u53E6\u5916\u53F3\u4FA7\u9891\u7E41\u66F4\u65B0\u8282\u70B9\u4E5F\u4F1A\u9020\u6210\u79FB\u52A8\u5C0F\u7403\u5F88\u5361,\u4F60\u53EF\u4EE5\u90FD\u6CE8\u91CA\u6389\u4EE5\u63D0\u5347\u5E27\u7387"), /* @__PURE__ */ Dong.createElement(
        "div",
        {
            ref: divRef,
            onPointerMove: handlePointerMove,
            style: {
                position: "relative",
                width: "40vw",
                height: "40vh",
                backgroundColor: "#f0f0f0",
                overflow: "hidden"
            }
        },
        /* @__PURE__ */ Dong.createElement(
            "div",
            {
                style: {
                    position: "absolute",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    transform: `translate(${position.x - 10}px, ${position.y - 10}px)`,
                    width: "20px",
                    height: "20px"
                }
            }
        )
    ), /* @__PURE__ */ Dong.createElement("input", { ref: inputRef }), /* @__PURE__ */ Dong.createElement("button", { onClick: handleRef }, "\u70B9\u51FB\u83B7\u53D6\u8F93\u5165\u6846\u5185\u5BB9"), /* @__PURE__ */ Dong.createElement(
        "button",
        {
            onClick: Dong.useCallBack(() => setElements((temp) => [...temp, ...temp]), [])
        },
        "\u70B9\u51FB\u89E6\u53D1\u4E00\u6B21useState,\u590D\u5236\u6570\u7EC4 [...temp, ...temp]"
    ), /* @__PURE__ */ Dong.createElement("div", { ref: chartRef, style: { width: "600px", height: "400px" } }), /* @__PURE__ */ Dong.createElement("ul", null, elements.map((item, index) => {
        return /* @__PURE__ */ Dong.createElement("li", { key: index }, item);
    })));
}
const root = document.getElementById("root");
if (root) {
    Dong.render(/* @__PURE__ */ Dong.createElement(App, null), root);
}
const realDomContainer = document.getElementById("realdom");
if (realDomContainer) {
    realDomContainer.innerHTML = `
        <h2>\u865A\u62DF DOM \u5C55\u793A</h2>
        <div>\u8FD9\u6BB5\u5185\u5BB9\u5DF2\u8131\u79BB\u865A\u62DFDOM\u7BA1\u7406,MiniReact\u65E0\u6CD5\u611F\u77E5\u5230\u8FD9\u90E8\u5206\u7684\u53D8\u5316</div>
        <pre>${Dong.useAware()[0]}</pre>
    `;
}

function startApp() {
    setTimeout(() => {
        const root = document.getElementById("root");
        if (root) {
            Dong.render(Dong.createElement(App, null), root);
        }
    }, 0);
}

window.onload = function () {
    alert("JS加载完成,如果虚拟DOM渲染异常请刷新");
    document.title = "MiniReactWithJSX";
    startApp();
};
