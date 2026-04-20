const cloudData = {
  name: "CLOUD & DEVOPS ENGINEERING",
  area: "cloud",
  eyebrow: "Infrastructure as Code · CI/CD · Container Orchestration",
  sub: "Build, deploy, and scale applications in the cloud. Master AWS, Azure, GCP, Kubernetes, Terraform, and modern DevOps practices that power the world's most reliable systems.",
  phases: [
    {
      name: "Linux Systems & Networking",
      level: "foundation",
      tagline: "The cloud runs on Linux",
      desc: "Before you orchestrate containers, understand the operating system. Linux fundamentals, process management, file systems, systemd, and performance tuning.",
      topics: [
        {
          name: "Linux System Administration",
          tag: "core",
          desc: "Boot process (BIOS, bootloader, kernel, init/systemd). Process management (ps, top, htop, kill, nice, renice). Memory management (free, vmstat, /proc/meminfo). File systems (ext4, XFS, ZFS), mounting, inodes. Systemd units (services, timers, sockets). Journald logging. Package management (apt, yum, pacman).",
          master: [
            "Analyze system performance with top, htop, iotop, and iostat",
            "Create and manage systemd service unit files",
            "Configure log rotation with logrotate",
            "Troubleshoot 'out of memory' using dmesg and /var/log/messages",
            "Set up cron jobs and systemd timers for automation",
            "Manage disk partitions with fdisk, parted, LVM",
            "Monitor network connections with ss, netstat, and lsof"
          ],
          code: "# Systemd service unit example\n# /etc/systemd/system/myapp.service\n[Unit]\nDescription=My Application Service\nAfter=network.target\n\n[Service]\nType=simple\nUser=appuser\nWorkingDirectory=/opt/myapp\nExecStart=/usr/bin/node /opt/myapp/server.js\nRestart=on-failure\nRestartSec=10\nEnvironment=NODE_ENV=production\n\n[Install]\nWantedBy=multi-user.target\n\n# Commands\nsudo systemctl daemon-reload\nsudo systemctl enable myapp.service\nsudo systemctl start myapp.service\nsudo systemctl status myapp.service\nsudo journalctl -u myapp.service -f\n\n# Logrotate configuration\n# /etc/logrotate.d/myapp\n/var/log/myapp/*.log {\n    daily\n    rotate 7\n    compress\n    delaycompress\n    missingok\n    notifempty\n    create 0640 appuser appgroup\n    sharedscripts\n    postrotate\n        systemctl reload myapp.service\n    endscript\n}",
          res: [
            "UNIX and Linux System Administration Handbook (Nemeth et al.)",
            "Linux Performance Analysis (Brendan Gregg)",
            "Red Hat System Administration I & II",
            "Linux Journey (linuxjourney.com)"
          ]
        },
        {
          name: "Bash Scripting & Automation",
          tag: "core",
          desc: "Shell scripting for system automation. Variables, conditionals, loops, functions. Input/output redirection, pipes, here documents. Error handling (trap, exit codes). Regular expressions (grep, sed, awk). Automating backups, log rotation, health checks.",
          master: [
            "Write a backup script that compresses and uploads to S3",
            "Use awk to parse log files and extract error counts",
            "Implement retry logic with exponential backoff in bash",
            "Create a system health check script with email alerts",
            "Use xargs and parallel for batch processing",
            "Write idempotent bash scripts (safe to run multiple times)",
            "Implement argument parsing with getopts"
          ],
          code: "#!/bin/bash\n# System health check script\n\nset -euo pipefail\n\n# Configuration\nTHRESHOLD_CPU=80\nTHRESHOLD_MEM=90\nTHRESHOLD_DISK=85\nALERT_EMAIL=\"admin@example.com\"\n\n# Function to send alert\nsend_alert() {\n    local subject=$1\n    local message=$2\n    echo \"$message\" | mail -s \"$subject\" \"$ALERT_EMAIL\"\n}\n\n# Check CPU usage\nCPU_USAGE=$(top -bn1 | grep \"Cpu(s)\" | awk '{print $2}' | cut -d'%' -f1)\nif (( $(echo \"$CPU_USAGE > $THRESHOLD_CPU\" | bc -l) )); then\n    send_alert \"High CPU Usage\" \"CPU usage is ${CPU_USAGE}%\"\nfi\n\n# Check memory usage\nMEM_USAGE=$(free | grep Mem | awk '{print $3/$2 * 100.0}')\nif (( $(echo \"$MEM_USAGE > $THRESHOLD_MEM\" | bc -l) )); then\n    send_alert \"High Memory Usage\" \"Memory usage is ${MEM_USAGE}%\"\nfi\n\n# Check disk usage\nDISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')\nif [ \"$DISK_USAGE\" -gt \"$THRESHOLD_DISK\" ]; then\n    send_alert \"High Disk Usage\" \"Disk usage is ${DISK_USAGE}%\"\nfi\n\n# Backup script with error handling\nbackup_with_retry() {\n    local source=$1\n    local dest=$2\n    local max_retries=3\n    local retry_delay=5\n    \n    for i in $(seq 1 $max_retries); do\n        if rsync -avz \"$source\" \"$dest\"; then\n            echo \"Backup succeeded on attempt $i\"\n            return 0\n        else\n            echo \"Backup failed (attempt $i/$max_retries)\"\n            sleep $((retry_delay * i))\n        fi\n    done\n    \n    echo \"Backup failed after $max_retries attempts\"\n    return 1\n}",
          res: [
            "Bash Guide for Beginners (TLDP)",
            "Advanced Bash-Scripting Guide (Mendel Cooper)",
            "The AWK Programming Language (Aho, Kernighan, Weinberger)",
            "sed & awk (Dale Dougherty)"
          ]
        },
        {
          name: "Networking for Cloud Engineers",
          tag: "core",
          desc: "TCP/IP stack, DNS, HTTP/HTTPS, load balancers, firewalls, NAT. VPC (Virtual Private Cloud), subnets, routing tables, security groups, NACLs. VPN, Direct Connect (AWS), ExpressRoute (Azure). Hybrid networking. IPv6 in cloud.",
          master: [
            "Design a VPC with public and private subnets, NAT gateway, and bastion host",
            "Configure security groups vs network ACLs (stateful vs stateless)",
            "Set up VPC peering between two VPCs",
            "Implement a site-to-site VPN to on-premises network",
            "Configure Application Load Balancer (ALB) with SSL termination",
            "Set up CloudFront or CDN with origin shield",
            "Troubleshoot network connectivity with VPC Flow Logs, Reachability Analyzer"
          ],
          code: "# AWS VPC using Terraform (simplified)\nresource \"aws_vpc\" \"main\" {\n    cidr_block = \"10.0.0.0/16\"\n    enable_dns_hostnames = true\n    enable_dns_support = true\n    tags = { Name = \"main-vpc\" }\n}\n\n# Public subnets\nresource \"aws_subnet\" \"public\" {\n    count = 2\n    vpc_id = aws_vpc.main.id\n    cidr_block = \"10.0.${count.index}.0/24\"\n    availability_zone = data.aws_availability_zones.available.names[count.index]\n    map_public_ip_on_launch = true\n    tags = { Name = \"public-subnet-${count.index}\" }\n}\n\n# Private subnets\nresource \"aws_subnet\" \"private\" {\n    count = 2\n    vpc_id = aws_vpc.main.id\n    cidr_block = \"10.0.${count.index + 10}.0/24\"\n    availability_zone = data.aws_availability_zones.available.names[count.index]\n    tags = { Name = \"private-subnet-${count.index}\" }\n}\n\n# Internet Gateway\nresource \"aws_internet_gateway\" \"main\" {\n    vpc_id = aws_vpc.main.id\n    tags = { Name = \"main-igw\" }\n}\n\n# NAT Gateway (for private subnets)\nresource \"aws_nat_gateway\" \"main\" {\n    allocation_id = aws_eip.nat.id\n    subnet_id = aws_subnet.public[0].id\n    tags = { Name = \"main-nat\" }\n}\n\n# Route tables\nresource \"aws_route_table\" \"public\" {\n    vpc_id = aws_vpc.main.id\n    route {\n        cidr_block = \"0.0.0.0/0\"\n        gateway_id = aws_internet_gateway.main.id\n    }\n}\n\nresource \"aws_route_table\" \"private\" {\n    vpc_id = aws_vpc.main.id\n    route {\n        cidr_block = \"0.0.0.0/0\"\n        nat_gateway_id = aws_nat_gateway.main.id\n    }\n}",
          res: [
            "AWS VPC Documentation (docs.aws.amazon.com/vpc)",
            "TCP/IP Illustrated (Stevens)",
            "Cloud Networking (Gary A. Donahue)",
            "AWS Certified Advanced Networking Study Guide"
          ]
        }
      ]
    },
    {
      name: "Infrastructure as Code (IaC)",
      level: "intermediate",
      tagline: "Automate your infrastructure",
      desc: "Stop clicking in web consoles. Write code to provision and manage cloud resources. Terraform, CloudFormation, Pulumi, and CDK. Immutable infrastructure principles.",
      topics: [
        {
          name: "Terraform — Complete Guide",
          tag: "core",
          desc: "HCL syntax, providers, resources, data sources. State management (local vs remote, state locking). Modules (creating, publishing, using). Workspaces, variable precedence. Terraform Cloud/Enterprise. terragrunt for DRY configurations.",
          master: [
            "Write Terraform configuration for an EC2 instance with security group",
            "Use remote state backend (S3 + DynamoDB for locking)",
            "Create a reusable Terraform module for VPC",
            "Implement Terraform workspaces for dev/staging/prod environments",
            "Use terraform import to bring existing resources under management",
            "Write Terraform tests with Terratest",
            "Understand Terraform lifecycle (create, update, destroy, replace)"
          ],
          code: "# Terraform configuration example\n# main.tf\nterraform {\n    required_version = \">= 1.0\"\n    backend \"s3\" {\n        bucket         = \"my-terraform-state\"\n        key            = \"prod/terraform.tfstate\"\n        region         = \"us-east-1\"\n        dynamodb_table = \"terraform-locks\"\n        encrypt        = true\n    }\n}\n\nprovider \"aws\" {\n    region = var.aws_region\n    default_tags {\n        tags = {\n            Environment = var.environment\n            ManagedBy   = \"Terraform\"\n        }\n    }\n}\n\n# Variables\nvariable \"environment\" {\n    description = \"Environment (dev/staging/prod)\"\n    type = string\n}\n\nvariable \"instance_type\" {\n    description = \"EC2 instance type\"\n    type = map(string)\n    default = {\n        dev     = \"t3.micro\"\n        staging = \"t3.small\"\n        prod    = \"t3.medium\"\n    }\n}\n\n# Data sources\ndata \"aws_ami\" \"amazon_linux\" {\n    most_recent = true\n    owners      = [\"amazon\"]\n    filter {\n        name   = \"name\"\n        values = [\"amzn2-ami-hvm-*-x86_64-gp2\"]\n    }\n}\n\n# Security Group\nresource \"aws_security_group\" \"web\" {\n    name        = \"${var.environment}-web-sg\"\n    description = \"Allow HTTP/HTTPS/SSH\"\n    vpc_id      = module.vpc.vpc_id\n\n    ingress {\n        from_port   = 80\n        to_port     = 80\n        protocol    = \"tcp\"\n        cidr_blocks = [\"0.0.0.0/0\"]\n        description = \"HTTP\"\n    }\n\n    ingress {\n        from_port   = 443\n        to_port     = 443\n        protocol    = \"tcp\"\n        cidr_blocks = [\"0.0.0.0/0\"]\n        description = \"HTTPS\"\n    }\n\n    ingress {\n        from_port   = 22\n        to_port     = 22\n        protocol    = \"tcp\"\n        cidr_blocks = [var.ssh_cidr]\n        description = \"SSH\"\n    }\n\n    egress {\n        from_port   = 0\n        to_port     = 0\n        protocol    = \"-1\"\n        cidr_blocks = [\"0.0.0.0/0\"]\n    }\n\n    tags = { Name = \"${var.environment}-web-sg\" }\n}\n\n# EC2 Instance\nresource \"aws_instance\" \"web\" {\n    ami                    = data.aws_ami.amazon_linux.id\n    instance_type          = var.instance_type[var.environment]\n    subnet_id              = module.vpc.public_subnets[0]\n    vpc_security_group_ids = [aws_security_group.web.id]\n    key_name               = aws_key_pair.main.key_name\n\n    user_data = <<-EOF\n        #!/bin/bash\n        yum update -y\n        yum install -y httpd\n        systemctl start httpd\n        systemctl enable httpd\n        echo \"<h1>Hello from ${var.environment}</h1>\" > /var/www/html/index.html\n    EOF\n\n    tags = { Name = \"${var.environment}-web-server\" }\n\n    lifecycle {\n        create_before_destroy = true\n    }\n}\n\n# Outputs\noutput \"instance_ip\" {\n    description = \"Public IP of web server\"\n    value       = aws_instance.web.public_ip\n}\n\n# variables.tfvars (not committed to git)\n# environment = \"prod\"\n# aws_region = \"us-west-2\"\n# ssh_cidr = \"203.0.113.0/24\"",
          res: [
            "Terraform: Up & Running (Yevgeniy Brikman)",
            "Terraform Documentation (terraform.io/docs)",
            "HashiCorp Terraform Associate Certification Study Guide",
            "Terratest: Testing Terraform Code"
          ]
        },
        {
          name: "AWS CloudFormation & CDK",
          tag: "core",
          desc: "AWS-native IaC. CloudFormation templates (YAML/JSON), stack sets, nested stacks, custom resources. AWS CDK (Cloud Development Kit) — TypeScript, Python, Go, C# — generate CloudFormation from code. SAM (Serverless Application Model) for serverless.",
          master: [
            "Write a CloudFormation template that creates a VPC, EC2, and RDS",
            "Use CloudFormation parameters, mappings, conditions, and outputs",
            "Implement a custom resource with Lambda to perform non-standard operations",
            "Create a CDK app in TypeScript with stacks for different environments",
            "Use CDK assertions for unit testing infrastructure",
            "Deploy a serverless application with SAM (API Gateway, Lambda, DynamoDB)",
            "Understand CloudFormation drift detection and remediation"
          ],
          code: "// AWS CDK (TypeScript) example\nimport * as cdk from 'aws-cdk-lib';\nimport * as ec2 from 'aws-cdk-lib/aws-ec2';\nimport * as rds from 'aws-cdk-lib/aws-rds';\nimport { Construct } from 'constructs';\n\nexport class WebAppStack extends cdk.Stack {\n    constructor(scope: Construct, id: string, props?: cdk.StackProps) {\n        super(scope, id, props);\n\n        // VPC\n        const vpc = new ec2.Vpc(this, 'MainVpc', {\n            maxAzs: 2,\n            natGateways: 1,\n            subnetConfiguration: [\n                {\n                    cidrMask: 24,\n                    name: 'Public',\n                    subnetType: ec2.SubnetType.PUBLIC,\n                },\n                {\n                    cidrMask: 24,\n                    name: 'Private',\n                    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,\n                },\n            ],\n        });\n\n        // Security Group\n        const webSg = new ec2.SecurityGroup(this, 'WebSg', {\n            vpc,\n            description: 'Allow HTTP/HTTPS/SSH',\n        });\n        webSg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'HTTP');\n        webSg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), 'HTTPS');\n\n        // EC2 Instance\n        const webServer = new ec2.Instance(this, 'WebServer', {\n            vpc,\n            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),\n            machineImage: ec2.MachineImage.latestAmazonLinux2(),\n            securityGroup: webSg,\n            keyName: 'my-key-pair',\n            userData: ec2.UserData.custom(`\n                #!/bin/bash\n                yum update -y\n                yum install -y httpd\n                systemctl start httpd\n                systemctl enable httpd\n            `),\n        });\n\n        // Output\n        new cdk.CfnOutput(this, 'WebServerPublicIp', {\n            value: webServer.instancePublicIp,\n        });\n    }\n}\n\nconst app = new cdk.App();\nnew WebAppStack(app, 'WebAppStack', {\n    env: {\n        account: process.env.CDK_DEFAULT_ACCOUNT,\n        region: process.env.CDK_DEFAULT_REGION,\n    },\n});\n\n# CloudFormation template (YAML)\nResources:\n  MyEC2Instance:\n    Type: AWS::EC2::Instance\n    Properties:\n      InstanceType: !Ref InstanceType\n      ImageId: !FindInMap [RegionMap, !Ref \"AWS::Region\", \"AMI\"]\n      SecurityGroupIds:\n        - !Ref InstanceSecurityGroup\n      Tags:\n        - Key: Name\n          Value: !Sub \"${Environment}-web-server\"\n\nParameters:\n  InstanceType:\n    Type: String\n    Default: t3.micro\n    AllowedValues:\n      - t3.micro\n      - t3.small\n      - t3.medium\n\nMappings:\n  RegionMap:\n    us-east-1:\n      AMI: ami-0c55b159cbfafe1f0\n    us-west-2:\n      AMI: ami-0d26eb3972b7f8c96\n\nConditions:\n  CreateProdResources: !Equals [!Ref Environment, \"prod\"]",
          res: [
            "AWS CloudFormation Documentation",
            "AWS CDK Developer Guide",
            "CDK Patterns (cdkpatterns.com)",
            "AWS Serverless Application Model (SAM) docs"
          ]
        },
        {
          name: "Configuration Management (Ansible)",
          tag: "intermediate",
          desc: "Post-provisioning configuration. Ansible: agentless, YAML-based playbooks, modules (apt, yum, copy, template, service). Roles, inventories, variables, vault for secrets. Jinja2 templating. Ansible Tower/AWX for automation.",
          master: [
            "Write an Ansible playbook to install and configure Nginx",
            "Use Ansible roles to structure complex configurations",
            "Implement idempotent tasks (handlers, state management)",
            "Use Ansible Vault to encrypt sensitive variables",
            "Write Jinja2 templates for dynamic configuration files",
            "Use Ansible facts for conditional execution",
            "Deploy an application with Ansible (clone repo, install deps, start service)"
          ],
          code: "# Ansible playbook example\n# site.yml\n---\n- name: Configure web servers\n  hosts: webservers\n  become: yes\n  vars:\n    app_port: 8080\n    app_version: \"1.2.3\"\n  \n  pre_tasks:\n    - name: Update apt cache\n      apt:\n        update_cache: yes\n        cache_valid_time: 3600\n  \n  roles:\n    - common\n    - nginx\n    - app\n  \n  tasks:\n    - name: Ensure app is running\n      systemd:\n        name: myapp\n        state: started\n        enabled: yes\n\n# Role structure\n# roles/nginx/\n# ├── tasks/main.yml\n# ├── handlers/main.yml\n# ├── templates/nginx.conf.j2\n# ├── files/\n# ├── vars/main.yml\n# └── defaults/main.yml\n\n# roles/nginx/tasks/main.yml\n---\n- name: Install nginx\n  apt:\n    name: nginx\n    state: present\n\n- name: Copy nginx configuration\n  template:\n    src: nginx.conf.j2\n    dest: /etc/nginx/nginx.conf\n  notify: restart nginx\n\n- name: Start nginx\n  systemd:\n    name: nginx\n    state: started\n    enabled: yes\n\n# roles/nginx/handlers/main.yml\n---\n- name: restart nginx\n  systemd:\n    name: nginx\n    state: restarted\n\n# roles/nginx/templates/nginx.conf.j2\nuser www-data;\nworker_processes {{ ansible_processor_cores }};\n\nevents {\n    worker_connections 1024;\n}\n\nhttp {\n    include /etc/nginx/mime.types;\n    default_type application/octet-stream;\n    \n    server {\n        listen 80;\n        server_name {{ domain_name }};\n        \n        location / {\n            proxy_pass http://localhost:{{ app_port }};\n            proxy_set_header Host $host;\n        }\n    }\n}\n\n# Encrypt sensitive variables\n# ansible-vault encrypt secrets.yml\n# ansible-playbook site.yml --ask-vault-pass\n\n# Inventory file (inventory/production)\n[webservers]\nweb1 ansible_host=10.0.1.10 ansible_user=ubuntu\nweb2 ansible_host=10.0.1.11 ansible_user=ubuntu\n\n[loadbalancers]\nlbaas ansible_host=10.0.1.20 ansible_user=ubuntu\n\n[all:vars]\nansible_python_interpreter=/usr/bin/python3",
          res: [
            "Ansible Documentation (docs.ansible.com)",
            "Ansible for DevOps (Jeff Geerling)",
            "Ansible Up & Running (Lorin Hochstein)",
            "Ansible Galaxy (galaxy.ansible.com)"
          ]
        }
      ]
    },
    {
      name: "Containerization & Orchestration",
      level: "advanced",
      tagline: "Package once, run anywhere",
      desc: "Docker containers and Kubernetes orchestration. Build efficient images, manage containers, and orchestrate clusters at scale.",
      topics: [
        {
          name: "Docker — Deep Dive",
          tag: "core",
          desc: "Container vs VM differences. Dockerfile (FROM, RUN, COPY, ADD, CMD, ENTRYPOINT, EXPOSE, ENV, WORKDIR). Image layers and caching. Multi-stage builds. Docker Compose for multi-container apps. Volume management (bind mounts, volumes). Networking (bridge, host, overlay, macvlan). Container registries (Docker Hub, ECR, ACR, GCR).",
          master: [
            "Write an optimized Dockerfile with multi-stage builds for a Node.js or Python app",
            "Reduce image size by 80% using Alpine, distroless, or scratch",
            "Use Docker Compose to run app + database + cache + queue",
            "Implement health checks in Dockerfile",
            "Set up a private Docker registry",
            "Understand Docker network drivers and when to use each",
            "Use docker inspect, logs, exec, and attach for debugging"
          ],
          code: "# Multi-stage Dockerfile for Go application\n# Stage 1: Build\nFROM golang:1.21-alpine AS builder\nWORKDIR /app\nCOPY go.mod go.sum ./\nRUN go mod download\nCOPY . .\nRUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .\n\n# Stage 2: Run\nFROM alpine:latest\nRUN apk --no-cache add ca-certificates\nWORKDIR /root/\nCOPY --from=builder /app/main .\nCOPY --from=builder /app/config.yaml .\nEXPOSE 8080\nCMD [\"./main\"]\n\n# Dockerfile for Node.js with layer caching\nFROM node:18-alpine AS deps\nWORKDIR /app\nCOPY package.json package-lock.json ./\nRUN npm ci --only=production\n\nFROM node:18-alpine AS runner\nWORKDIR /app\nCOPY --from=deps /app/node_modules ./node_modules\nCOPY . .\nUSER node\nEXPOSE 3000\nCMD [\"node\", \"index.js\"]\n\n# Docker Compose\nversion: '3.8'\nservices:\n  app:\n    build: .\n    ports:\n      - \"3000:3000\"\n    environment:\n      - DB_HOST=postgres\n      - REDIS_HOST=redis\n    depends_on:\n      - postgres\n      - redis\n    healthcheck:\n      test: [\"CMD\", \"curl\", \"-f\", \"http://localhost:3000/health\"]\n      interval: 30s\n      timeout: 10s\n      retries: 3\n\n  postgres:\n    image: postgres:15\n    environment:\n      POSTGRES_DB: myapp\n      POSTGRES_USER: user\n      POSTGRES_PASSWORD: ${DB_PASSWORD}\n    volumes:\n      - postgres_data:/var/lib/postgresql/data\n    ports:\n      - \"5432:5432\"\n\n  redis:\n    image: redis:7-alpine\n    volumes:\n      - redis_data:/data\n    ports:\n      - \"6379:6379\"\n\nvolumes:\n  postgres_data:\n  redis_data:\n\n# Docker commands\ndocker build -t myapp:latest .\ndocker run -d -p 8080:8080 --name myapp myapp:latest\ndocker-compose up -d\ndocker-compose logs -f app\ndocker exec -it myapp sh\ndocker system prune -a",
          res: [
            "Docker Deep Dive (Nigel Poulton)",
            "Docker Documentation (docs.docker.com)",
            "Dockerfile Best Practices (Docker docs)",
            "Play with Docker (labs.play-with-docker.com)"
          ]
        },
        {
          name: "Kubernetes — Complete Guide",
          tag: "core",
          desc: "Cluster architecture: control plane (API server, etcd, scheduler, controller manager) and worker nodes (kubelet, kube-proxy, container runtime). Pods, Deployments, Services, ConfigMaps, Secrets, Ingress, Persistent Volumes (PV/PVC). Helm for package management. Operators for stateful applications.",
          master: [
            "Deploy a Kubernetes cluster using kind, minikube, or kubeadm",
            "Write YAML manifests for Deployment, Service, ConfigMap, Secret",
            "Perform rolling updates and rollbacks with Deployments",
            "Configure Ingress with NGINX Ingress Controller and TLS certificates",
            "Use Helm to package and deploy a multi-service application",
            "Set up Horizontal Pod Autoscaler (HPA) based on CPU/memory metrics",
            "Implement liveness, readiness, and startup probes",
            "Use kubectl port-forward, exec, logs, describe for debugging"
          ],
          code: "# Kubernetes deployment YAML\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web-app\n  namespace: production\n  labels:\n    app: web-app\nspec:\n  replicas: 3\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0\n  selector:\n    matchLabels:\n      app: web-app\n  template:\n    metadata:\n      labels:\n        app: web-app\n    spec:\n      containers:\n      - name: app\n        image: myapp:1.2.3\n        ports:\n        - containerPort: 8080\n        env:\n        - name: DB_HOST\n          valueFrom:\n            configMapKeyRef:\n              name: app-config\n              key: db_host\n        - name: DB_PASSWORD\n          valueFrom:\n            secretKeyRef:\n              name: app-secrets\n              key: db_password\n        resources:\n          requests:\n            memory: \"256Mi\"\n            cpu: \"250m\"\n          limits:\n            memory: \"512Mi\"\n            cpu: \"500m\"\n        livenessProbe:\n          httpGet:\n            path: /health\n            port: 8080\n          initialDelaySeconds: 30\n          periodSeconds: 10\n        readinessProbe:\n          httpGet:\n            path: /ready\n            port: 8080\n          initialDelaySeconds: 5\n          periodSeconds: 5\n        volumeMounts:\n        - name: config-volume\n          mountPath: /etc/config\n      volumes:\n      - name: config-volume\n        configMap:\n          name: app-config\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: web-app-service\n  namespace: production\nspec:\n  selector:\n    app: web-app\n  ports:\n  - port: 80\n    targetPort: 8080\n  type: ClusterIP\n---\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: web-app-ingress\n  namespace: production\n  annotations:\n    kubernetes.io/ingress.class: nginx\n    cert-manager.io/cluster-issuer: letsencrypt-prod\nspec:\n  tls:\n  - hosts:\n    - app.example.com\n    secretName: tls-secret\n  rules:\n  - host: app.example.com\n    http:\n      paths:\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: web-app-service\n            port:\n              number: 80\n---\n# Helm Chart structure\n# mychart/\n# ├── Chart.yaml\n# ├── values.yaml\n# ├── templates/\n# │   ├── deployment.yaml\n# │   ├── service.yaml\n# │   ├── configmap.yaml\n# │   └── _helpers.tpl\n# └── charts/\n\n# Helm commands\nhelm create mychart\nhelm lint ./mychart\nhelm install myapp ./mychart --values prod-values.yaml\nhelm upgrade myapp ./mychart --values prod-values.yaml\nhelm rollback myapp 1\nhelm uninstall myapp\n\n# kubectl commands\nkubectl get nodes\nkubectl get pods -n production\nkubectl logs -f deployment/web-app\nkubectl exec -it pod-name -- /bin/bash\nkubectl port-forward service/web-app-service 8080:80\nkubectl rollout status deployment/web-app\nkubectl rollout history deployment/web-app\nkubectl rollout undo deployment/web-app --to-revision=2",
          res: [
            "Kubernetes: Up & Running (Burns, Beda, Hightower)",
            "Kubernetes Documentation (kubernetes.io/docs)",
            "The Kubernetes Book (Nigel Poulton)",
            "Kubernetes Patterns (Ibryam, Hu)"
          ]
        }
      ]
    }
  ]
};