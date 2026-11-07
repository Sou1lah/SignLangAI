# Sign-language AI study set

Three shallow source clones are kept together here for evaluation. The repository code, virtual environment, test outputs, model weights, and datasets are intentionally ignored by Git; this README and the parent third-party manifest are tracked. Do not copy upstream source into first-party application folders.

## What is here

| Order | Project                                                                                                                                                 | What it does                                                                                                                                       | Local fit and current status                                                                                                                                                                                                                                                                                         |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | [Sign Language Translator (SLT)](sign-language-translator/README.md) — [upstream](https://github.com/sign-language-translator/sign-language-translator) | Python framework; current demonstrated path is rule-based text-to-sign using tokenization, sign mapping, and clip concatenation.                   | Best first local experiment. CPU text-to-sign tests pass. Its README still marks sign-to-text inference as “COMING SOON”; do not treat it as a working two-way translator. Repository license: Apache-2.0.                                                                                                           |
| 2     | [Uni-Sign](uni-sign/README.md) — [paper](https://arxiv.org/abs/2501.15187)                                                                              | Research implementation for sign-language understanding/translation with pose and RGB modalities, pretrained features, and downstream fine-tuning. | Source only; no GPU detected here, and upstream requirements pin CUDA 12.1 PyTorch plus DeepSpeed. No data or checkpoints downloaded and no inference/training run. No root license file was found in the clone.                                                                                                     |
| 3     | [Signer](signer/README.md)                                                                                                                              | Video-to-gloss recognition pipeline with MediaPipe features, visual/pose fusion, temporal modeling, and a separate gloss-to-text LLM step.         | Source and a small sample video included; model weights are separately hosted on Kaggle. Syntax check passed, but inference was not run because no weights are present. Its README states MIT, but the clone has no root license file. The described dataset and glosses are Turkish Sign Language (AUTSL), not ASL. |

These are not equivalent, ready-to-integrate translators. In particular, text-to-sign clip synthesis, gloss recognition, and fluent sign-to-text translation are different tasks. A gloss string is not itself a fluent translation, and performance on one sign language does not transfer automatically to another.

## Machine and validation

This checkout has a Ryzen 5 PRO 5650U, 12 logical CPUs, 14.9 GiB RAM, and no detected NVIDIA GPU. The test environment is isolated at `.venv-slt/` and uses Python 3.12 with CPU-only PyTorch; it does not change `ai/` dependencies.

SLT validation:

- Passed: `test_slt_translate`, `test_slt_assets_tree`, and `test_slt_assets_path` — 3 passed.
- Broader local subset: 3 passed, 3 failed, 2 deselected. The failures are upstream test assumptions/output handling: calling the Click command without a subcommand prints help but exits 2; the text-embedding test parses a directory as its checkpoint path; and the completion test's last-token assertion is affected by download progress output. No upstream files were changed to mask these results.
- Uni-Sign and Signer: Python source compiled successfully; this is a syntax check, not an inference test.

The SLT text-to-sign test uses a short sentence and does not establish accuracy or support for our target sign language. Before selecting a model for the product, decide the target language and test with appropriately licensed, representative clips.

## Running the local SLT checks

The following environment was installed for the test above. Run from the repository root:

```sh
python3.12 -m venv thirdparty/sign-language-models/.venv-slt
thirdparty/sign-language-models/.venv-slt/bin/python -m pip install \
  --index-url https://download.pytorch.org/whl/cpu 'torch==2.2.2+cpu'
thirdparty/sign-language-models/.venv-slt/bin/python -m pip install \
  -e 'thirdparty/sign-language-models/sign-language-translator[dev]'
```

Then run the focused CPU checks:

```sh
cd thirdparty/sign-language-models/sign-language-translator
../.venv-slt/bin/python -m pytest -q tests/test_cli.py \
  -k 'slt_translate or assets_tree or assets_path'
../.venv-slt/bin/slt --help
```

The upstream optional MediaPipe extra is not installed. MediaPipe is not required for the rule-based text-to-sign check. Do not install Uni-Sign's full requirements on this laptop; use a compatible cloud GPU for its complete pipeline. For Signer, obtain and review its separate Kaggle checkpoint and dependencies before attempting inference.

## Study notes

1. **SLT:** Follow text normalization/tokenization, language-specific grammar and sign mapping, then `ConcatenativeSynthesis` in the upstream tree. The output is assembled from dictionary clips; vocabulary coverage and regional grammar constrain results. Its examples cover English, Urdu, and Hindi text paired with Pakistan Sign Language resources.
2. **Uni-Sign:** Read the paper and `docs/framework.png`, then trace the `train_stage1.sh`, `train_stage2.sh`, and `train_stage3.sh` entry points. It is the research/GPU option, not the laptop smoke test.
3. **Signer:** Read `inferencePipelineExample.py` and trace `InferencePipeline/Inference.py` through feature extraction, boundary detection, and gloss classification. Read the README's LLM stage as a separate dependency; the available sample video alone is not enough to reproduce the model without its checkpoints.

The clones are shallow and pinned to the commits fetched for this study:

| Project                  | Commit    |
| ------------------------ | --------- |
| Sign Language Translator | `cca5f3a` |
| Uni-Sign                 | `eed438b` |
| Signer                   | `84f4757` |

Model checkpoints and datasets are not included. Review each upstream license, dataset terms, and model-card terms before redistribution or product use.
