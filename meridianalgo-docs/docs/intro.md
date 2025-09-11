---
sidebar_position: 1
---

# Welcome to MeridianAlgo Docs

MeridianAlgo is an open-source platform for democratizing access to sophisticated trading tools and algorithmic finance. Our mission is to empower everyone—from curious beginners to advanced quants—with transparent, ethical, and powerful technology.

## What is MeridianAlgo?

- **Open Source**: All code, strategies, and tools are available for anyone to use, learn from, and contribute to.
- **Community-Driven**: Built by and for a global community of traders, developers, and researchers.
- **Accessible**: Designed to be approachable for all skill levels, with clear documentation and practical guides.

## Quick Start

### Install the Core Library

```bash
pip install meridianalgo
```

### Run Your First Backtest

```python
from meridianalgo.backtest import BacktestEngine
import pandas as pd

data = pd.read_csv('your_data.csv')
engine = BacktestEngine(data)
results = engine.run()
print(results)
```

See the [Guides](./guides/overview) for more examples and advanced usage.

## Contributing

- Fork the repo and submit pull requests for new features, bug fixes, or docs improvements.
- Join our [Discord](https://discord.gg/meridianalgo) to connect with the community.
- See the [API Reference](./api) for details on all modules.

---

Open source. Transparent. Accessible to all.
