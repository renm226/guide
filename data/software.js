const softwareData = {
  name: "SOFTWARE ENGINEERING & SYSTEM DESIGN",
  area: "soft",
  eyebrow: "Clean Code · Architecture · Scalable Systems",
  sub: "Build software that lasts. From design patterns to system architecture, from testing to deployment. Master the craft of creating robust, maintainable, and scalable software systems.",
  phases: [
    {
      name: "Programming Fundamentals & Paradigms",
      level: "foundation",
      tagline: "The building blocks of software",
      desc: "Before you architect systems, master the fundamentals. Data structures, algorithms, and multiple programming paradigms. Language is just a tool — principles are universal.",
      topics: [
        {
          name: "Data Structures & Algorithms",
          tag: "core",
          desc: "Arrays, linked lists (singly/doubly), stacks, queues, hash tables (collision resolution: chaining, open addressing), trees (BST, AVL, Red-Black, B-trees), heaps (min/max, priority queue), graphs (adjacency matrix/list, traversal: BFS, DFS). Sorting algorithms (quicksort, mergesort, heapsort, radix sort) — implement and analyze complexity.",
          master: [
            "Implement a dynamic array (ArrayList) from scratch with resizing",
            "Implement a hash table with separate chaining and load factor resizing",
            "Implement a binary search tree with insert, delete, find, and traversal",
            "Implement quicksort and mergesort and analyze worst-case vs average-case complexity",
            "Solve 50+ LeetCode problems covering all major data structures",
            "Understand Big O notation: calculate time/space complexity for any algorithm",
            "Implement Dijkstra's shortest path and A* search algorithm"
          ],
          code: "// Hash table with separate chaining\nclass HashTable<K, V> {\n    private static class Entry<K, V> {\n        K key;\n        V value;\n        Entry<K, V> next;\n        \n        Entry(K key, V value) {\n            this.key = key;\n            this.value = value;\n        }\n    }\n    \n    private Entry<K, V>[] buckets;\n    private int size = 0;\n    private static final double LOAD_FACTOR = 0.75;\n    \n    @SuppressWarnings(\"unchecked\")\n    public HashTable() {\n        buckets = (Entry<K, V>[]) new Entry[16];\n    }\n    \n    private int hash(K key) {\n        return Math.abs(key.hashCode()) % buckets.length;\n    }\n    \n    public void put(K key, V value) {\n        int index = hash(key);\n        Entry<K, V> entry = buckets[index];\n        \n        while (entry != null) {\n            if (entry.key.equals(key)) {\n                entry.value = value;\n                return;\n            }\n            entry = entry.next;\n        }\n        \n        Entry<K, V> newEntry = new Entry<>(key, value);\n        newEntry.next = buckets[index];\n        buckets[index] = newEntry;\n        size++;\n        \n        if ((double) size / buckets.length > LOAD_FACTOR) {\n            resize();\n        }\n    }\n    \n    private void resize() {\n        // Implementation omitted for brevity\n    }\n}",
          res: [
            "Introduction to Algorithms (CLRS)",
            "Grokking Algorithms (Aditya Bhargava)",
            "Cracking the Coding Interview (Gayle Laakmann McDowell)",
            "LeetCode.com — practice platform"
          ]
        },
        {
          name: "Object-Oriented Programming & SOLID",
          tag: "core",
          desc: "OOP principles: encapsulation, inheritance, polymorphism, abstraction. SOLID principles: Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. Design patterns (Gang of Four): Creational (Singleton, Factory, Builder), Structural (Adapter, Decorator, Proxy), Behavioral (Observer, Strategy, Command).",
          master: [
            "Explain and apply each SOLID principle with code examples",
            "Implement a Factory pattern for creating different types of database connections",
            "Use Observer pattern to implement an event notification system",
            "Apply Dependency Injection to decouple classes and improve testability",
            "Identify and refactor code that violates Liskov Substitution",
            "Implement a Builder pattern for constructing complex objects (e.g., SQL query builder)",
            "Use Strategy pattern to swap sorting algorithms at runtime"
          ],
          code: "// Strategy Pattern example\ninterface PaymentStrategy {\n    void pay(int amount);\n}\n\nclass CreditCardPayment implements PaymentStrategy {\n    private String cardNumber;\n    \n    CreditCardPayment(String cardNumber) {\n        this.cardNumber = cardNumber;\n    }\n    \n    @Override\n    public void pay(int amount) {\n        System.out.println(\"Paid \" + amount + \" using credit card \" + cardNumber);\n    }\n}\n\nclass PayPalPayment implements PaymentStrategy {\n    private String email;\n    \n    PayPalPayment(String email) {\n        this.email = email;\n    }\n    \n    @Override\n    public void pay(int amount) {\n        System.out.println(\"Paid \" + amount + \" using PayPal account \" + email);\n    }\n}\n\nclass ShoppingCart {\n    private PaymentStrategy paymentStrategy;\n    \n    public void setPaymentStrategy(PaymentStrategy strategy) {\n        this.paymentStrategy = strategy;\n    }\n    \n    public void checkout(int total) {\n        paymentStrategy.pay(total);\n    }\n}\n\n// Usage\nShoppingCart cart = new ShoppingCart();\ncart.setPaymentStrategy(new CreditCardPayment(\"1234-5678\"));\ncart.checkout(100);\n\ncart.setPaymentStrategy(new PayPalPayment(\"user@example.com\"));\ncart.checkout(50);",
          res: [
            "Design Patterns: Elements of Reusable OO Software (GoF)",
            "Clean Code (Robert Martin)",
            "Head First Design Patterns (Freeman, Robson)",
            "Refactoring to Patterns (Joshua Kerievsky)"
          ]
        },
        {
          name: "Functional Programming",
          tag: "core",
          desc: "Immutable data, pure functions, referential transparency, side-effect isolation. Higher-order functions (map, filter, reduce), function composition, currying, partial application. Monads (Maybe, Either, IO), functors, applicatives. Languages: Haskell, Elm, Scala, Clojure, or FP features in JS/Python/Java.",
          master: [
            "Implement map, filter, reduce (fold) from scratch",
            "Write a curried function and explain partial application",
            "Use Option/Maybe monad to handle null safely without exceptions",
            "Compose multiple functions into a pipeline",
            "Explain monad laws (left identity, right identity, associativity)",
            "Refactor imperative code with loops into functional map/filter/reduce",
            "Implement a simple Either monad for error handling"
          ],
          code: "// Functional programming in JavaScript\n\n// Immutability\nconst numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);  // Returns new array, doesn't modify original\n\n// Pure function\nconst add = (x, y) => x + y;  // No side effects, same input = same output\n\n// Higher-order functions\nconst filterEven = numbers.filter(n => n % 2 === 0);\nconst sum = numbers.reduce((acc, n) => acc + n, 0);\n\n// Currying\nconst multiply = x => y => x * y;\nconst double = multiply(2);\nconsole.log(double(5));  // 10\n\n// Function composition\nconst compose = (f, g) => x => f(g(x));\nconst addOne = x => x + 1;\nconst square = x => x * x;\nconst addOneThenSquare = compose(square, addOne);\nconsole.log(addOneThenSquare(4));  // (4+1)^2 = 25\n\n// Maybe monad (simplified)\nclass Maybe {\n    constructor(value) { this.value = value; }\n    static of(value) { return new Maybe(value); }\n    map(fn) { return this.value === null ? Maybe.of(null) : Maybe.of(fn(this.value)); }\n    getOrElse(defaultValue) { return this.value === null ? defaultValue : this.value; }\n}\n\nconst result = Maybe.of(5).map(x => x * 2).map(x => x + 1).getOrElse(0);\nconsole.log(result);  // 11",
          res: [
            "Functional Programming in Scala (Paul Chiusano)",
            "Learn You a Haskell for Great Good (Miran Lipovača)",
            "Functional Light JS (Kyle Simpson — free online)",
            "Category Theory for Programmers (Bartosz Milewski)"
          ]
        }
      ]
    },
    {
      name: "Software Design & Architecture",
      level: "intermediate",
      tagline: "Building for change and scale",
      desc: "How to structure software that grows with requirements. Architectural patterns, clean architecture, microservices, event-driven design, and domain-driven design.",
      topics: [
        {
          name: "Architectural Patterns",
          tag: "core",
          desc: "Layered architecture (presentation, business, persistence, database), Hexagonal architecture (ports and adapters), Clean architecture (entities, use cases, interfaces, frameworks), CQRS (Command Query Responsibility Segregation), Event Sourcing, Microservices vs Monolith (trade-offs, decomposition strategies), Serverless architecture.",
          master: [
            "Design a layered architecture for an e-commerce system",
            "Implement Clean Architecture with separation of concerns",
            "Explain when to choose microservices vs monolith with concrete examples",
            "Implement CQRS pattern with separate read and write models",
            "Design an event-sourced system with event store and projections",
            "Understand the strangler fig pattern for monolith migration",
            "Implement a circuit breaker pattern for microservice resilience"
          ],
          code: "// Clean Architecture layers (Java example)\n\n// Entity (Enterprise Business Rules)\npublic class Product {\n    private Long id;\n    private String name;\n    private Money price;\n    private int quantity;\n    \n    public boolean isAvailable() {\n        return quantity > 0;\n    }\n    \n    public void reduceQuantity(int amount) {\n        if (amount > quantity) throw new InsufficientStockException();\n        quantity -= amount;\n    }\n}\n\n// Use Case (Application Business Rules)\npublic class PlaceOrderUseCase {\n    private final ProductRepository productRepository;\n    private final OrderRepository orderRepository;\n    \n    public PlaceOrderUseCase(ProductRepository productRepository, OrderRepository orderRepository) {\n        this.productRepository = productRepository;\n        this.orderRepository = orderRepository;\n    }\n    \n    public Order execute(PlaceOrderCommand command) {\n        Product product = productRepository.findById(command.getProductId());\n        if (!product.isAvailable()) {\n            throw new ProductNotAvailableException();\n        }\n        \n        Order order = new Order(command.getCustomerId(), product, command.getQuantity());\n        product.reduceQuantity(command.getQuantity());\n        \n        return orderRepository.save(order);\n    }\n}\n\n// Interface Adapters (Controllers, Presenters)\n@RestController\npublic class OrderController {\n    private final PlaceOrderUseCase placeOrderUseCase;\n    \n    @PostMapping(\"/orders\")\n    public OrderResponse placeOrder(@RequestBody OrderRequest request) {\n        PlaceOrderCommand command = new PlaceOrderCommand(\n            request.getProductId(), \n            request.getCustomerId(), \n            request.getQuantity()\n        );\n        Order order = placeOrderUseCase.execute(command);\n        return new OrderResponse(order.getId(), order.getStatus());\n    }\n}",
          res: [
            "Clean Architecture (Robert Martin)",
            "Patterns of Enterprise Application Architecture (Martin Fowler)",
            "Building Microservices (Sam Newman)",
            "Domain-Driven Design (Eric Evans)"
          ]
        },
        {
          name: "Domain-Driven Design (DDD)",
          tag: "advanced",
          desc: "Strategic design: Ubiquitous language, bounded contexts, context mapping (partnership, shared kernel, customer-supplier, conformist, anticorruption layer, open host service). Tactical patterns: Entity, Value Object, Aggregate, Aggregate Root, Repository, Factory, Service, Domain Event, Specification.",
          master: [
            "Identify bounded contexts for a complex business domain (e.g., e-commerce, banking)",
            "Define aggregates and aggregate roots with consistency boundaries",
            "Implement value objects with immutability and equality semantics",
            "Use domain events to communicate changes between bounded contexts",
            "Design repositories for aggregate persistence",
            "Apply anticorruption layer when integrating with legacy systems",
            "Implement specification pattern for complex business rules"
          ],
          code: "// DDD tactical patterns (Java)\n\n// Value Object (immutable, equality by attributes)\npublic final class Money {\n    private final BigDecimal amount;\n    private final Currency currency;\n    \n    public Money(BigDecimal amount, Currency currency) {\n        this.amount = amount;\n        this.currency = currency;\n    }\n    \n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof Money)) return false;\n        Money money = (Money) o;\n        return amount.equals(money.amount) && currency.equals(money.currency);\n    }\n    \n    @Override\n    public int hashCode() {\n        return Objects.hash(amount, currency);\n    }\n}\n\n// Aggregate Root\npublic class Order extends AggregateRoot<OrderId> {\n    private OrderId id;\n    private CustomerId customerId;\n    private List<OrderLine> lines = new ArrayList<>();\n    private OrderStatus status;\n    \n    public void addLine(ProductId productId, int quantity, Money price) {\n        if (status != OrderStatus.DRAFT) {\n            throw new OrderNotModifiableException();\n        }\n        lines.add(new OrderLine(productId, quantity, price));\n        registerEvent(new OrderLineAddedEvent(id, productId, quantity));\n    }\n    \n    public void submit() {\n        if (lines.isEmpty()) {\n            throw new EmptyOrderException();\n        }\n        this.status = OrderStatus.SUBMITTED;\n        registerEvent(new OrderSubmittedEvent(id, calculateTotal()));\n    }\n    \n    private Money calculateTotal() {\n        return lines.stream()\n            .map(OrderLine::getSubtotal)\n            .reduce(Money.ZERO, Money::add);\n    }\n}\n\n// Repository\npublic interface OrderRepository {\n    Order findById(OrderId id);\n    void save(Order order);\n    void delete(OrderId id);\n}",
          res: [
            "Domain-Driven Design (Eric Evans — the blue book)",
            "Implementing Domain-Driven Design (Vaughn Vernon)",
            "Domain-Driven Design Distilled (Vaughn Vernon)",
            "DDD Community resources (dddcommunity.org)"
          ]
        },
        {
          name: "Design Patterns in Depth",
          tag: "advanced",
          desc: "Creational patterns beyond Singleton: Abstract Factory for families of products, Prototype for cloning, Dependency Injection container implementation. Structural: Bridge (decouple abstraction from implementation), Composite (tree structures), Flyweight (shared objects for memory efficiency). Behavioral: Chain of Responsibility (request processing pipeline), Memento (undo/redo), Visitor (operations on object structure).",
          master: [
            "Implement Abstract Factory for cross-platform UI components",
            "Use Bridge pattern to separate device control from device implementations",
            "Implement a Composite pattern for file system representation",
            "Use Chain of Responsibility for request validation and processing",
            "Implement Memento pattern for text editor undo/redo",
            "Use Visitor to add new operations without modifying existing classes",
            "Implement a simple Dependency Injection container"
          ],
          code: "// Visitor Pattern example\ninterface Element {\n    void accept(Visitor visitor);\n}\n\nclass Paragraph implements Element {\n    private String text;\n    \n    Paragraph(String text) { this.text = text; }\n    String getText() { return text; }\n    \n    @Override\n    public void accept(Visitor visitor) {\n        visitor.visit(this);\n    }\n}\n\nclass Image implements Element {\n    private String url;\n    \n    Image(String url) { this.url = url; }\n    String getUrl() { return url; }\n    \n    @Override\n    public void accept(Visitor visitor) {\n        visitor.visit(this);\n    }\n}\n\ninterface Visitor {\n    void visit(Paragraph paragraph);\n    void visit(Image image);\n}\n\nclass HTMLExporter implements Visitor {\n    private StringBuilder output = new StringBuilder();\n    \n    @Override\n    public void visit(Paragraph paragraph) {\n        output.append(\"<p>\").append(paragraph.getText()).append(\"</p>\\n\");\n    }\n    \n    @Override\n    public void visit(Image image) {\n        output.append(\"<img src='\").append(image.getUrl()).append(\"' />\\n\");\n    }\n    \n    String getHTML() { return output.toString(); }\n}\n\n// Usage\nList<Element> document = Arrays.asList(\n    new Paragraph(\"Hello World\"),\n    new Image(\"photo.jpg\"),\n    new Paragraph(\"Another paragraph\")\n);\n\nHTMLExporter exporter = new HTMLExporter();\nfor (Element element : document) {\n    element.accept(exporter);\n}\nSystem.out.println(exporter.getHTML());",
          res: [
            "Design Patterns (Gamma et al. — GoF book)",
            "Head First Design Patterns (Freeman & Robson)",
            "Design Patterns in Modern C++ (Dmitri Nesteruk)",
            "Refactoring.Guru — Design Patterns (website)"
          ]
        }
      ]
    },
    {
      name: "System Design & Scalability",
      level: "advanced",
      tagline: "Building systems that serve millions",
      desc: "Designing large-scale distributed systems. Load balancing, caching, database sharding, message queues, CDNs, and consistency models. Prepare for system design interviews and real-world architecture challenges.",
      topics: [
        {
          name: "Load Balancing & Proxies",
          tag: "core",
          desc: "Load balancer algorithms: round-robin, least connections, IP hash, weighted round-robin. Layer 4 (transport) vs Layer 7 (application) load balancing. Reverse proxy (Nginx, HAProxy, Envoy). Forward proxy. Load balancer deployment: active-passive, active-active, global server load balancing (GSLB). Health checks, session persistence (sticky sessions).",
          master: [
            "Configure Nginx as a reverse proxy with load balancing to 3 backend servers",
            "Explain the difference between L4 and L7 load balancing with use cases",
            "Implement session persistence using cookie insertion",
            "Design a GSLB solution for multi-region failover",
            "Set up HAProxy with health checks and fallback servers",
            "Understand consistent hashing for distributed caching",
            "Implement rate limiting at the load balancer level"
          ],
          code: "# Nginx load balancing configuration\nhttp {\n    upstream backend_servers {\n        # Load balancing method (default: round-robin)\n        least_conn;\n        \n        # Servers with weights\n        server backend1.example.com weight=3;\n        server backend2.example.com weight=2;\n        server backend3.example.com backup;\n        \n        # Health check\n        keepalive 32;\n    }\n    \n    server {\n        listen 80;\n        \n        location / {\n            proxy_pass http://backend_servers;\n            proxy_set_header Host $host;\n            proxy_set_header X-Real-IP $remote_addr;\n            \n            # Session stickiness (cookie-based)\n            proxy_cookie_path / \"/; HttpOnly; Secure\";\n        }\n        \n        # Rate limiting\n        limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;\n        location /api/ {\n            limit_req zone=mylimit burst=20 nodelay;\n            proxy_pass http://backend_servers;\n        }\n    }\n}\n\n# HAProxy configuration (excerpt)\nfrontend web_frontend\n    bind *:80\n    mode http\n    default_backend web_servers\n\nbackend web_servers\n    mode http\n    balance roundrobin\n    option httpchk GET /health\n    server web1 10.0.0.1:80 check inter 3s rise 2 fall 3\n    server web2 10.0.0.2:80 check inter 3s rise 2 fall 3\n    server web3 10.0.0.3:80 check backup",
          res: [
            "Nginx Documentation (nginx.org)",
            "HAProxy Configuration Manual",
            "System Design Interview (Alex Xu)",
            "High Performance Browser Networking (Ilya Grigorik)"
          ]
        },
        {
          name: "Caching Strategies",
          tag: "core",
          desc: "Cache types: CDN (CloudFront, Cloudflare), DNS caching, HTTP caching (ETag, Last-Modified, Cache-Control), application caching (Redis, Memcached), database caching (query cache, buffer pool). Cache strategies: cache-aside (lazy loading), write-through, write-behind (write-back), write-around. Eviction policies: LRU, LFU, FIFO, TTL. Cache invalidation challenges.",
          master: [
            "Implement cache-aside pattern with Redis for database queries",
            "Configure HTTP caching headers for static assets (Cache-Control, ETag)",
            "Design a CDN strategy for global content delivery",
            "Implement write-through cache for banking transactions",
            "Use Redis with TTL for session storage",
            "Understand cache stampede problem and solutions (probabilistic early expiration)",
            "Implement distributed caching with consistent hashing"
          ],
          code: "# Python Redis cache-aside implementation\nimport redis\nimport json\nfrom functools import wraps\n\nredis_client = redis.Redis(host='localhost', port=6379, decode_responses=True)\n\ndef cache_aside(ttl=300):\n    def decorator(func):\n        @wraps(func)\n        def wrapper(*args, **kwargs):\n            # Create cache key from function name and arguments\n            cache_key = f\"{func.__name__}:{str(args)}:{str(kwargs)}\"\n            \n            # Try to get from cache\n            cached_result = redis_client.get(cache_key)\n            if cached_result:\n                return json.loads(cached_result)\n            \n            # Cache miss - call the actual function\n            result = func(*args, **kwargs)\n            \n            # Store in cache with TTL\n            redis_client.setex(cache_key, ttl, json.dumps(result))\n            \n            return result\n        return wrapper\n    return decorator\n\n@cache_aside(ttl=60)\ndef get_user_profile(user_id):\n    # Expensive database query\n    return db.query(\"SELECT * FROM users WHERE id = ?\", user_id)\n\n# Write-through pattern\ndef update_user(user_id, data):\n    # Update database\n    db.execute(\"UPDATE users SET name = ? WHERE id = ?\", data['name'], user_id)\n    \n    # Update cache\n    cache_key = f\"get_user_profile:({user_id},):{{}}\"\n    redis_client.setex(cache_key, 60, json.dumps(data))\n\n# Redis LRU configuration (redis.conf)\n# maxmemory 256mb\n# maxmemory-policy allkeys-lru",
          res: [
            "Redis documentation (redis.io)",
            "Caching Strategies (Microsoft Architecture Center)",
            "Memcached: A Distributed Memory Object Caching System",
            "HTTP Caching (MDN Web Docs)"
          ]
        },
        {
          name: "Database Scaling & Sharding",
          tag: "advanced",
          desc: "Vertical scaling (more powerful hardware) vs horizontal scaling (more nodes). Replication: master-slave (read replicas), master-master (multi-master). Sharding strategies: range-based, hash-based (consistent hashing), directory-based. Shard key selection. Distributed transactions: 2PC (two-phase commit), Saga pattern. Eventual consistency vs strong consistency. CAP theorem.",
          master: [
            "Design a sharding strategy for a social media feed database",
            "Implement read replicas with PostgreSQL streaming replication",
            "Explain the difference between horizontal and vertical partitioning",
            "Design a system using Saga pattern for distributed transactions",
            "Understand consistent hashing for dynamic shard rebalancing",
            "Implement a distributed ID generator (Snowflake, UUID v7)",
            "Explain CAP theorem trade-offs with real-world examples"
          ],
          code: "# Database sharding example (application-level)\nimport hashlib\n\nclass ShardedDatabase:\n    def __init__(self, shards):\n        self.shards = shards  # List of database connections\n        self.num_shards = len(shards)\n    \n    def _get_shard(self, shard_key):\n        # Consistent hashing (simplified)\n        hash_value = hashlib.md5(shard_key.encode()).hexdigest()\n        shard_index = int(hash_value, 16) % self.num_shards\n        return self.shards[shard_index]\n    \n    def get_user(self, user_id):\n        shard = self._get_shard(user_id)\n        return shard.query(\"SELECT * FROM users WHERE id = ?\", user_id)\n    \n    def get_user_posts(self, user_id, page=1, limit=20):\n        # Posts table might be sharded by user_id as well\n        shard = self._get_shard(user_id)\n        offset = (page - 1) * limit\n        return shard.query(\n            \"SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?\",\n            user_id, limit, offset\n        )\n\n# Range-based sharding\n# Shard 1: user_id 1-1,000,000\n# Shard 2: user_id 1,000,001-2,000,000\n# Shard 3: user_id 2,000,001-3,000,000\n\n# Distributed ID generator (Snowflake)\n# 64-bit ID: 1 bit unused | 41 bits timestamp | 10 bits machine ID | 12 bits sequence\nclass SnowflakeID:\n    def __init__(self, machine_id):\n        self.machine_id = machine_id\n        self.sequence = 0\n        self.last_timestamp = -1\n        self.EPOCH = 1609459200000  # 2021-01-01\n    \n    def generate(self):\n        timestamp = int(time.time() * 1000)\n        if timestamp == self.last_timestamp:\n            self.sequence = (self.sequence + 1) & 4095  # 12 bits\n            if self.sequence == 0:\n                timestamp = self._wait_next_millis()\n        else:\n            self.sequence = 0\n        \n        self.last_timestamp = timestamp\n        \n        return ((timestamp - self.EPOCH) << 22) | (self.machine_id << 12) | self.sequence",
          res: [
            "Designing Data-Intensive Applications (Martin Kleppmann)",
            "Database Internals (Alex Petrov)",
            "High Performance MySQL (Baron Schwartz et al.)",
            "Consistent Hashing (original paper by Karger et al.)"
          ]
        }
      ]
    },
    {
      name: "Testing & Quality Assurance",
      level: "intermediate",
      tagline: "Confidence through automation",
      desc: "Testing pyramid: unit tests, integration tests, end-to-end tests. Test-driven development (TDD), behavior-driven development (BDD). Mocking, stubbing, property-based testing. Performance testing, security testing, chaos engineering.",
      topics: [
        {
          name: "Unit & Integration Testing",
          tag: "core",
          desc: "Unit testing frameworks: JUnit (Java), pytest (Python), Jest (JS), RSpec (Ruby). Test isolation, mocking frameworks (Mockito, unittest.mock). Test fixtures, parameterized tests. Code coverage (JaCoCo, coverage.py). Test-driven development (red-green-refactor). Integration tests: testing components together, testcontainers for external dependencies.",
          master: [
            "Write unit tests with 80%+ coverage for a non-trivial module",
            "Use mocking to isolate a class from its dependencies",
            "Implement parameterized tests to test multiple input combinations",
            "Apply TDD to implement a new feature (write test first, then code)",
            "Set up integration tests with testcontainers for database testing",
            "Use property-based testing (Hypothesis, QuickCheck) to find edge cases",
            "Configure CI pipeline to run tests on every commit"
          ],
          code: "# Python unit tests with pytest and mocking\nimport pytest\nfrom unittest.mock import Mock, patch\nfrom myapp import UserService, UserRepository\n\nclass TestUserService:\n    def test_get_user_by_id_returns_user(self):\n        # Arrange\n        mock_repo = Mock(spec=UserRepository)\n        mock_repo.find_by_id.return_value = {\"id\": 1, \"name\": \"Alice\"}\n        service = UserService(mock_repo)\n        \n        # Act\n        user = service.get_user(1)\n        \n        # Assert\n        assert user[\"id\"] == 1\n        assert user[\"name\"] == \"Alice\"\n        mock_repo.find_by_id.assert_called_once_with(1)\n    \n    @patch('myapp.UserService.validate_email')\n    def test_create_user_with_invalid_email_raises_error(self, mock_validate):\n        mock_validate.side_effect = ValueError(\"Invalid email\")\n        service = UserService(Mock())\n        \n        with pytest.raises(ValueError, match=\"Invalid email\"):\n            service.create_user(\"bob\", \"invalid-email\")\n    \n    # Parameterized test\n    @pytest.mark.parametrize(\"input,expected\", [\n        (\"a@b.com\", True),\n        (\"invalid\", False),\n        (\"\", False),\n    ])\n    def test_email_validation(self, input, expected):\n        assert UserService.is_valid_email(input) == expected\n\n# Property-based testing with Hypothesis\nfrom hypothesis import given, strategies as st\n\ndef test_reverse_twice_returns_original():\n    @given(st.lists(st.integers()))\n    def test_reverse_twice(lst):\n        assert list(reversed(list(reversed(lst)))) == lst\n    test_reverse_twice()",
          res: [
            "xUnit Test Patterns (Gerard Meszaros)",
            "Working Effectively with Unit Tests (Jay Fields)",
            "pytest documentation (docs.pytest.org)",
            "The Art of Unit Testing (Roy Osherove)"
          ]
        },
        {
          name: "End-to-End & Performance Testing",
          tag: "advanced",
          desc: "E2E testing frameworks: Selenium, Cypress, Playwright, Puppeteer. Page Object Model. Performance testing: JMeter, Gatling, k6. Load testing (simulating users), stress testing (finding breaking point), soak testing (long duration). Profiling: flame graphs, memory leaks, CPU profiling. Chaos engineering: Chaos Monkey, Gremlin.",
          master: [
            "Write an E2E test with Playwright that logs in and completes a purchase flow",
            "Implement Page Object Model for maintainable E2E tests",
            "Run a load test with k6 to simulate 1000 concurrent users",
            "Profile a web application's memory usage and identify leaks",
            "Set up chaos engineering experiment to test service resilience",
            "Use JMeter to create a distributed load test",
            "Analyze performance test results and identify bottlenecks"
          ],
          code: "// JavaScript E2E test with Playwright\nconst { test, expect } = require('@playwright/test');\n\n// Page Object Model\nclass LoginPage {\n    constructor(page) {\n        this.page = page;\n        this.usernameInput = page.locator('#username');\n        this.passwordInput = page.locator('#password');\n        this.loginButton = page.locator('button[type=\"submit\"]');\n        this.errorMessage = page.locator('.error');\n    }\n    \n    async goto() {\n        await this.page.goto('https://example.com/login');\n    }\n    \n    async login(username, password) {\n        await this.usernameInput.fill(username);\n        await this.passwordInput.fill(password);\n        await this.loginButton.click();\n    }\n}\n\ntest('successful login redirects to dashboard', async ({ page }) => {\n    const loginPage = new LoginPage(page);\n    await loginPage.goto();\n    await loginPage.login('validuser', 'validpass');\n    \n    await expect(page).toHaveURL('https://example.com/dashboard');\n    await expect(page.locator('h1')).toContainText('Welcome');\n});\n\n// k6 load test script\nimport http from 'k6/http';\nimport { check, sleep } from 'k6';\n\nexport let options = {\n    stages: [\n        { duration: '30s', target: 50 },   // Ramp up to 50 users\n        { duration: '1m', target: 50 },    // Stay at 50 users\n        { duration: '10s', target: 0 },    // Ramp down to 0\n    ],\n    thresholds: {\n        http_req_duration: ['p(95)<500'],  // 95% of requests under 500ms\n        http_req_failed: ['rate<0.01'],    // Less than 1% failure rate\n    },\n};\n\nexport default function () {\n    let response = http.get('https://test-api.example.com/products');\n    \n    check(response, {\n        'status is 200': (r) => r.status === 200,\n        'response time < 200ms': (r) => r.timings.duration < 200,\n    });\n    \n    sleep(1);\n}",
          res: [
            "Playwright Documentation (playwright.dev)",
            "k6 Documentation (k6.io)",
            "JMeter User Manual",
            "Chaos Engineering (Principles and Practices)"
          ]
        }
      ]
    }
  ]
};