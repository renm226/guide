const aiData = {
  name: "ARTIFICIAL INTELLIGENCE & ML",
  area: "ai",
  eyebrow: "Machine Intelligence · Deep Learning · LLMs · Research Frontier",
  sub: "From first-principles mathematics to frontier research. Build, train, and understand intelligent systems at a level that lets you push the field forward. Every algorithm derived, every system implemented from scratch.",
  phases: [
    {
      name: "Mathematical Bedrock",
      level: "foundation",
      tagline: "The language all of AI is written in",
      desc: "No shortcut exists here. Every technique in machine learning is applied mathematics. Fluency — not familiarity — in linear algebra, calculus, probability, information theory, and optimization is non-negotiable. Derive before you implement.",
      topics: [
        {
          name: "Linear Algebra — Complete Mastery",
          tag: "core",
          desc: "Vectors, matrices, tensors. Eigendecomposition derived from first principles. SVD as the fundamental decomposition of linear maps. PCA from covariance matrix eigenvector interpretation. Understand every operation geometrically: matrix multiplication as transformation, eigenvalues as scaling factors, orthogonal matrices as rotations.",
          master: [
            "Derive SVD from scratch: prove AᵀA = VΣᵀΣVᵀ",
            "Implement PCA from covariance matrix without sklearn",
            "Understand column space, null space, rank-nullity theorem",
            "Implement least-squares regression via normal equations (XᵀX)⁻¹Xᵀy",
            "Implement Gram-Schmidt orthogonalization from scratch",
            "Prove that the Frobenius norm of a matrix equals the L2 norm of its singular values",
            "Implement power iteration to find dominant eigenvectors"
          ],
          deepdive: "The connection between SVD and PCA is not just mathematical elegance — it's the foundation of every dimensionality reduction technique. When you compute the SVD of a centered data matrix X = UΣVᵀ, the right singular vectors V are the principal components. Understanding this means you can derive PCA, LSA (in NLP), collaborative filtering, and even certain GAN training dynamics from a single decomposition.",
          code: "import numpy as np\n\n# SVD from scratch via power iteration\ndef svd_power(A, k=3, iters=100):\n    m, n = A.shape\n    V = np.random.randn(n, k)\n    V, _ = np.linalg.qr(V)\n    for _ in range(iters):\n        U = A @ V\n        U, S_diag, _ = np.linalg.svd(U, full_matrices=False)\n        U = U[:, :k]\n        S = S_diag[:k]\n        V = A.T @ U / S\n        V, _ = np.linalg.qr(V)\n    return U, S, V.T",
          res: [
            "Linear Algebra (Gilbert Strang MIT OCW — free)",
            "Essence of Linear Algebra (3Blue1Brown)",
            "Matrix Cookbook (Petersen — free PDF)",
            "Numerical Linear Algebra (Trefethen & Bau)"
          ]
        },
        {
          name: "Multivariable Calculus & Optimization",
          tag: "core",
          desc: "Chain rule is the soul of backpropagation. Partial derivatives, Jacobians, Hessians. Convex optimization: KKT conditions, Lagrange multipliers, strong and weak duality. Second-order methods (Newton's method, quasi-Newton L-BFGS). Non-convex optimization: saddle points, local minima, the role of noise. Understand the implicit regularization of SGD.",
          master: [
            "Derive backpropagation from chain rule on a computational graph manually",
            "Implement gradient descent, SGD, momentum, Adam from scratch with math",
            "Prove convexity of cross-entropy loss for logistic regression",
            "Derive KKT conditions and solve a constrained optimization by hand",
            "Implement L-BFGS and understand the Hessian approximation",
            "Understand why saddle points dominate local minima in high-dimensional loss landscapes",
            "Derive the natural gradient and understand why it's Fisher-information-scaled"
          ],
          deepdive: "The natural gradient (Amari 1998) is perhaps the most underrated optimization concept. Standard gradient descent treats parameter space as Euclidean, but neural network parameter space has a Riemannian geometry given by the Fisher Information Matrix. The natural gradient pre-multiplies the standard gradient by F⁻¹, making the update distribution-aware. This is why K-FAC and related second-order methods outperform Adam in large-scale training.",
          res: [
            "Convex Optimization (Boyd & Vandenberghe — free PDF)",
            "Numerical Optimization (Nocedal & Wright)",
            "Mathematics for ML (Deisenroth — free PDF)",
            "Natural Gradient Works Efficiently in Learning (Amari 1998)"
          ]
        },
        {
          name: "Probability, Statistics & Information Theory",
          tag: "core",
          desc: "Probability theory with measure-theoretic foundations. Random variables, expectation, variance, moment generating functions. Exponential family distributions. MLE, MAP, Bayesian inference, conjugate priors. MCMC (Metropolis-Hastings, Hamiltonian Monte Carlo). Shannon entropy, mutual information, KL divergence — not just formulas but their meaning in learning theory.",
          master: [
            "Derive MLE for Gaussian, Bernoulli, Categorical, Dirichlet",
            "Derive ELBO (Evidence Lower Bound) from scratch for VAEs",
            "Implement Metropolis-Hastings from scratch and sample from a banana distribution",
            "Prove that cross-entropy loss = NLL under the model's distribution",
            "Derive mutual information from KL divergence: I(X;Y) = KL(p(x,y)||p(x)p(y))",
            "Implement Hamiltonian Monte Carlo and compare mixing vs MH",
            "Connect Fisher information to the curvature of the log-likelihood"
          ],
          deepdive: "The ELBO is the engine of modern generative modeling. For a latent variable model p(x) = ∫p(x|z)p(z)dz, the intractable marginal is lower-bounded by E_q[log p(x|z)] - KL(q(z|x)||p(z)). The first term is reconstruction accuracy; the second is a regularizer. When you train a VAE, a GAN, a diffusion model — you are maximizing some form of this bound. Every generative model is a different variational approximation.",
          res: [
            "All of Statistics (Wasserman)",
            "Pattern Recognition and ML (Bishop — free PDF)",
            "Information Theory, Inference, Learning Algorithms (MacKay — free)",
            "Elements of Information Theory (Cover & Thomas)"
          ]
        }
      ]
    },
    {
      name: "Classical ML — Algorithmic Level",
      level: "intermediate",
      tagline: "Algorithms that still dominate production",
      desc: "Before deep learning, and alongside it. Master every algorithm at the derivation and implementation level. sklearn is for prototyping — you should be able to write every algorithm yourself.",
      topics: [
        {
          name: "Supervised Learning from Scratch",
          tag: "core",
          desc: "Linear regression (normal equations + gradient descent forms). Logistic regression (derive sigmoid from maximum entropy principle). Decision trees (information gain, Gini, CART algorithm, cost-complexity pruning). SVMs (primal and dual formulation, kernel trick via Mercer's theorem, soft margin, sequential minimal optimization). Regularization: Ridge (L2), Lasso (L1, why it produces sparsity via KKT), ElasticNet.",
          master: [
            "Derive logistic regression gradient: ∂L/∂w = Xᵀ(σ(Xw) - y)",
            "Implement CART decision tree including cost-complexity pruning",
            "Derive SVM dual from primal using Lagrangian: maximise Σαᵢ - ½ΣΣαᵢαⱼyᵢyⱼK(xᵢ,xⱼ)",
            "Prove why L1 regularization produces sparsity using KKT stationarity",
            "Implement kernel SVM with RBF kernel from scratch",
            "Derive bias-variance decomposition from expected generalization error",
            "Implement isotonic regression"
          ],
          deepdive: "The kernel trick is far more profound than 'trick'. Mercer's theorem states that any positive semi-definite function K(x, x') implicitly defines a feature map φ such that K(x, x') = φ(x)ᵀφ(x'). This means you can work in infinite-dimensional feature spaces (Gaussian RBF kernel) in O(n²) time — never materializing the feature space. Neural networks' implicit kernel (NTK — Neural Tangent Kernel) is the bridge between classical and deep learning theory.",
          res: [
            "Pattern Recognition and ML (Bishop)",
            "ESL — Elements of Statistical Learning (Hastie et al. — free PDF)",
            "Understanding Machine Learning: From Theory to Algorithms (Shalev-Shwartz)"
          ]
        },
        {
          name: "Ensemble Methods & Gradient Boosting",
          tag: "advanced",
          desc: "Random Forests: bagging + random subspace method, OOB error estimation, feature importance via permutation. Gradient Boosting from first principles: functional gradient descent, shrinkage, subsampling. XGBoost (second-order Taylor expansion of loss, regularization in split gain). LightGBM (histogram-based algorithm, leaf-wise growth, GOSS). CatBoost (ordered boosting, symmetric trees). SHAP values for any model.",
          master: [
            "Derive gradient boosting update: F_m(x) = F_{m-1}(x) + ν·h_m(x) where h_m fits negative gradient",
            "Implement AdaBoost from scratch including weight updates",
            "Derive XGBoost split gain: Gain = ½[G_L²/(H_L+λ) + G_R²/(H_R+λ) - (G_L+G_R)²/(H_L+H_R+λ)] - γ",
            "Understand why GOSS (Gradient-based One-Side Sampling) maintains accuracy",
            "Tune LightGBM hyperparameters: num_leaves vs max_depth, min_data_in_leaf",
            "Implement SHAP TreeExplainer and verify against brute-force game-theoretic values",
            "Design a stacking ensemble with proper cross-validation to avoid leakage"
          ],
          code: "# Gradient Boosting from scratch\nclass GradientBooster:\n    def __init__(self, n_est=100, lr=0.1, max_depth=3):\n        self.n_est = n_est\n        self.lr = lr\n        self.max_depth = max_depth\n        self.trees = []\n    \n    def fit(self, X, y):\n        F = np.full(len(y), y.mean())\n        for _ in range(self.n_est):\n            residuals = y - self._sigmoid(F)\n            tree = DecisionTreeRegressor(max_depth=self.max_depth)\n            tree.fit(X, residuals)\n            self.trees.append(tree)\n            F += self.lr * tree.predict(X)\n    \n    def _sigmoid(self, z):\n        return 1 / (1 + np.exp(-z))",
          res: [
            "XGBoost paper (Chen & Guestrin 2016)",
            "LightGBM paper (Ke et al. 2017)",
            "SHAP: A Unified Approach to Interpreting Model Predictions",
            "Kaggle winning solutions — tabular track"
          ]
        },
        {
          name: "Unsupervised & Dimensionality Reduction",
          tag: "core",
          desc: "Clustering: K-means (derivation as EM for Gaussian mixtures with isotropic covariance), DBSCAN (density-based, reachability plots), hierarchical clustering (linkage criteria, dendrogram interpretation). Dimensionality reduction: PCA (maximizing variance vs minimizing reconstruction error), t-SNE (symmetric SNE, perplexity selection), UMAP (Riemannian geometry foundations, cross-entropy minimization), autoencoders.",
          master: [
            "Derive K-means as an EM algorithm with hard assignments",
            "Implement DBSCAN from scratch including reachability and core points",
            "Prove that PCA minimizes reconstruction error and maximizes variance simultaneously",
            "Understand the crowding problem in t-SNE and why UMAP solves it",
            "Implement a deep autoencoder for MNIST and compare latent spaces",
            "Derive the t-SNE gradient: ∂C/∂yᵢ = 4 Σⱼ (pᵢⱼ - qᵢⱼ)(yᵢ - yⱼ)(1 + ||yᵢ - yⱼ||²)⁻¹",
            "Explain when to use UMAP vs t-SNE vs PCA for visualization"
          ],
          deepdive: "UMAP's theoretical foundation is more rigorous than t-SNE. It assumes the data lies on a Riemannian manifold with a locally constant metric. The manifold is approximated by a fuzzy topological structure (simplicial set), then a low-dimensional representation is found that minimizes cross-entropy between the high-dimensional and low-dimensional fuzzy sets. This explains why UMAP preserves more global structure than t-SNE and is significantly faster.",
          res: [
            "UMAP: Uniform Manifold Approximation and Projection (McInnes 2018)",
            "t-SNE paper (van der Maaten & Hinton 2008)",
            "Dimensionality Reduction: A Comparative Review (van der Maaten)",
            "Visualizing Data using t-SNE (original paper)"
          ]
        }
      ]
    },
    {
      name: "Deep Learning — From Metal to Model",
      level: "intermediate",
      tagline: "Build neural networks from the GPU up",
      desc: "Implement everything from scratch before using frameworks. Understanding backpropagation at the code level is the dividing line between practitioner and engineer. Then master GPU programming for neural nets.",
      topics: [
        {
          name: "Autograd Engines & Backpropagation",
          tag: "core",
          desc: "Forward pass, computational graph construction, backward pass with gradient accumulation. Implementing a full autograd engine (like micrograd or tinygrad). Numerical gradient checking. Jacobian-vector products vs vector-Jacobian products. Higher-order derivatives. Gradient tape pattern vs define-by-run. Understanding TorchScript and torch.compile.",
          master: [
            "Implement a working autograd engine supporting +, *, tanh, exp, log operations",
            "Train an MLP on MNIST using your autograd engine",
            "Verify gradients with finite differences: (f(x+ε)-f(x-ε))/2ε",
            "Implement Jacobian-vector products for efficient Hessian-vector computation",
            "Understand vmap (vectorized map) and how it enables per-sample gradients efficiently",
            "Profile autograd overhead vs manual gradient computation",
            "Understand gradient checkpointing: trade compute for memory"
          ],
          res: [
            "Karpathy micrograd (YouTube + code)",
            "PyTorch Autograd internals docs",
            "JAX Sharp Bits — understand JVP vs VJP",
            "tinygrad source code (George Hotz)"
          ]
        },
        {
          name: "Transformers — Full Implementation",
          tag: "core",
          desc: "Multi-head self-attention derived from scratch (QKV projections, scaled dot-product, why √d_k scaling). Causal masking. Rotary positional embeddings (RoPE) and why they outperform sinusoidal. Layer norm vs batch norm — derive both gradients. Encoder-only (BERT), decoder-only (GPT), encoder-decoder (T5). FlashAttention (IO-aware algorithm, tiling strategy). Mixture of Experts (MoE) transformers.",
          master: [
            "Implement complete Transformer from scratch in PyTorch — no nn.Transformer",
            "Derive why scaled attention uses 1/√d_k: prevents softmax saturation in high-dim",
            "Implement RoPE positional embeddings and verify rotation equivariance",
            "Implement FlashAttention tiling strategy (forward pass) in Python",
            "Train a character-level GPT-2 on custom text data",
            "Implement grouped query attention (GQA) used in Llama-3",
            "Profile attention memory: O(n²) vs FlashAttention O(n)",
            "Implement a simple MoE layer with top-k routing"
          ],
          deepdive: "FlashAttention (Dao et al. 2022) is arguably the most impactful systems paper for LLMs. Standard attention materializes the full n×n attention matrix in HBM (GPU slow memory). FlashAttention computes attention in SRAM tiles, never materializing the full matrix — reducing memory from O(n²) to O(n) and achieving 2-4× speedup. The key insight is IO-awareness: the bottleneck is not FLOPs but memory bandwidth. Understanding this is essential for writing efficient GPU code.",
          code: "def attention(Q, K, V, mask=None, scale=None):\n    d_k = Q.size(-1)\n    scale = scale or d_k ** -0.5\n    scores = torch.matmul(Q, K.transpose(-2, -1)) * scale\n    if mask is not None:\n        scores = scores.masked_fill(mask == 0, -1e9)\n    weights = F.softmax(scores, dim=-1)\n    return torch.matmul(weights, V), weights",
          res: [
            "Attention Is All You Need (Vaswani 2017)",
            "FlashAttention-2 paper (Dao 2023)",
            "nanoGPT (Karpathy — study the codebase)",
            "RoPE paper (Su et al. 2022)"
          ]
        },
        {
          name: "LLM Pre-training, Fine-tuning & Alignment",
          tag: "advanced",
          desc: "Data pipelines: Common Crawl filtering, deduplication (exact and fuzzy via MinHash LSH), quality classification. BPE tokenization from scratch. Chinchilla scaling laws (compute-optimal token/parameter ratio). Distributed pre-training: tensor parallelism (Megatron), pipeline parallelism, FSDP, sequence parallelism. SFT on instruction data. RLHF: reward modeling, PPO for LLMs. DPO (bypasses RL — derive why it works). LoRA, QLoRA, GaLore.",
          master: [
            "Implement BPE tokenizer from scratch matching HuggingFace tokenizers output",
            "Derive Chinchilla's optimal token budget given a compute constraint C: N* ∝ C^0.5",
            "Fine-tune a 7B model with QLoRA on a single 24GB GPU",
            "Derive DPO loss: L = -E[log σ(β(log π_θ(y_w|x)/π_ref(y_w|x) - log π_θ(y_l|x)/π_ref(y_l|x)))]",
            "Implement GRPO (Group Relative Policy Optimization used in DeepSeek-R1)",
            "Understand intrinsic dimensionality hypothesis — why LoRA rank 8-64 is sufficient",
            "Profile distributed training communication overhead with NCCL"
          ],
          deepdive: "GRPO (DeepSeek-R1, 2025) eliminates the value network from PPO by using group-relative reward normalization. For a group of G outputs {o1...oG} per question, advantage = (r - mean(r)) / std(r). This makes RL training far more compute-efficient and is why DeepSeek-R1 achieved o1-level reasoning at a fraction of training cost. Understanding this policy gradient variant is now essential for LLM alignment researchers.",
          res: [
            "Chinchilla paper (Hoffmann 2022)",
            "InstructGPT (Ouyang 2022)",
            "DPO paper (Rafailov 2023)",
            "DeepSeek-R1 technical report (2025)",
            "Megatron-LM paper"
          ]
        }
      ]
    },
    {
      name: "Advanced Architectures & Frontier Research",
      level: "advanced",
      tagline: "Push the state of the art",
      desc: "Diffusion models, graph neural networks, state space models, mechanistic interpretability. These are the active research frontiers where PhDs are being written today.",
      topics: [
        {
          name: "Diffusion Models — Complete Theory",
          tag: "advanced",
          desc: "DDPM forward process: q(x_t|x_0) = N(√ᾱ_t x_0, (1-ᾱ_t)I) — derive the closed form. Reverse process: parameterize with ε-network. ELBO derivation for diffusion (VLB decomposition). Score-based generative models (Song et al.) — score matching objective, connection to diffusion via tweedie's formula. DDIM for deterministic sampling. Classifier-free guidance (derive the modified score). Latent diffusion (Rombach). Flow matching (Lipman).",
          master: [
            "Derive DDPM forward process closed form using reparameterization",
            "Derive that DDPM objective simplifies to E||ε - ε_θ(√ᾱ_t x_0 + √(1-ᾱ_t)ε, t)||²",
            "Implement a small DDPM on MNIST from scratch",
            "Derive classifier-free guidance: ε̃ = ε_uncond + w(ε_cond - ε_uncond)",
            "Understand flow matching and why it's simpler: dφ = u_t dt",
            "Implement a consistency model for single-step generation",
            "Compare DDPM vs DDIM sampling: stochastic vs deterministic trajectories"
          ],
          deepdive: "Flow matching (Lipman et al. 2022) reframes generative modeling as learning a vector field that transforms noise to data via ODEs. Unlike diffusion's complex SDE math, flow matching uses a simple regression objective: L = E||v_θ(x_t, t) - u_t||² where u_t is a conditional vector field. The straight-flow variant (SD3, Flux) uses linear interpolation paths, making sampling more efficient than diffusion's curved trajectories.",
          res: [
            "DDPM (Ho et al. 2020)",
            "Score-Based Generative Modeling (Song et al. 2020)",
            "Flow Matching for Generative Modeling (Lipman 2022)",
            "Stable Diffusion 3 technical report"
          ]
        },
        {
          name: "Graph Neural Networks & Geometric DL",
          tag: "advanced",
          desc: "Spectral GNNs: graph Laplacian, Fourier transform on graphs, Chebyshev polynomials (ChebNet). Spatial GNNs: message passing framework, GCN (derivation from spectral), GraphSAGE (neighborhood sampling, aggregation functions), GAT (attention coefficients). Graph pooling, graph-level tasks, expressive power of GNNs (Weisfeiler-Lehman hierarchy, WL test limitations).",
          master: [
            "Derive the graph Laplacian L = D - A and its normalized form L_norm = I - D⁻¹/²AD⁻¹/²",
            "Implement graph convolution using Chebyshev polynomials",
            "Derive GCN as a first-order approximation of ChebNet with λ_max ≈ 2",
            "Implement GraphSAGE with mean, LSTM, and pooling aggregators",
            "Prove that standard GNNs are at most as powerful as the WL isomorphism test",
            "Implement GIN (Graph Isomorphism Network) with theoretical guarantees",
            "Understand over-smoothing: why deep GNNs collapse representations"
          ],
          deepdive: "The WL test for graph isomorphism is the theoretical upper bound for GNN expressiveness. Standard message-passing GNNs cannot distinguish certain non-isomorphic graphs that the WL test can. GIN (Xu et al.) achieves WL-level expressiveness by using injective neighborhood aggregation: h_v^(k) = MLP((1+ε)·h_v^(k-1) + Σ_u∈N(v) h_u^(k-1)). Understanding this limitation is crucial for designing more powerful GNNs for molecular property prediction and combinatorial tasks.",
          res: [
            "Semi-Supervised Classification with Graph Convolutional Networks (Kipf 2016)",
            "Graph Attention Networks (Veličković 2017)",
            "How Powerful are Graph Neural Networks? (Xu 2018)",
            "Geometric Deep Learning (Bronstein — foundational blueprint)"
          ]
        },
        {
          name: "Mechanistic Interpretability",
          tag: "research",
          desc: "Reverse-engineering what neural networks compute. Circuit analysis (Elhage et al. 2021). Superposition hypothesis: how models pack more features than dimensions via interference. Sparse autoencoders (SAEs) for monosemantic feature extraction. Activation patching and causal tracing. TransformerLens. Attention head roles: induction heads, copy-suppression heads, name-mover heads.",
          master: [
            "Run activation patching on GPT-2 to identify indirect object identification (IOI) circuits",
            "Train a sparse autoencoder on MLP activations and analyze discovered features",
            "Reproduce the induction head formation during in-context learning",
            "Implement causal tracing (ROME-style) to localize factual memories",
            "Understand superposition: prove that n orthogonal features can be stored in d<n dims",
            "Apply SAE to a frontier model and analyze polysemantic neurons",
            "Contribute to ARENA or Alignment Forum with original interpretability work"
          ],
          deepdive: "The superposition hypothesis explains why models can represent more features than neurons. Instead of each neuron representing one concept (monosemanticity), models encode features as nearly orthogonal vectors in a higher-dimensional 'neuron basis' than the feature dimension. This allows storing O(d²) features in d dimensions via interference patterns that are linearly separable only when read by a second layer. SAEs recover these features by learning a sparse overcomplete basis.",
          res: [
            "A Mathematical Framework for Transformer Circuits (Anthropic 2021)",
            "Toy Models of Superposition (Elhage 2022)",
            "Sparse Autoencoders Find Highly Interpretable Features (Anthropic 2023)",
            "TransformerLens documentation and tutorials"
          ]
        }
      ]
    }
  ]
};