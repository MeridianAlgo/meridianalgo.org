---
sidebar_position: 2
---

# API Reference

Welcome to the MeridianAlgo API Reference. Here you'll find detailed documentation for all core modules, classes, and functions.

## Modules

- [backtest](#backtest)
- [indicators](#indicators)
- [utils](#utils)

---

## backtest

### BacktestEngine

```python
from meridianalgo.backtest import BacktestEngine
```

- **BacktestEngine(data, strategy=None, ...)**: Run backtests on your historical data.
- Methods:
  - `run()`: Execute the backtest and return results.
  - `plot_results()`: Visualize performance.

## indicators

### SMA

```python
from meridianalgo.indicators import SMA
```

- **SMA(series, period=20)**: Calculate the simple moving average.

## utils

### trade_summary

```python
from meridianalgo.utils import trade_summary
```

- **trade_summary(df)**: Summarize trade results from a DataFrame.

---

For more details and advanced usage, see the [Guides](./guides/overview). 