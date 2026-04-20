const networkingData = {
  name: "NETWORKING & INFRASTRUCTURE",
  area: "net",
  eyebrow: "Internet Protocols · Network Security · Scalable Systems",
  sub: "Master the fabric that connects the digital world. From electrical signals to BGP routing, from TCP congestion control to SDN. Build, secure, and optimize networks that never fail.",
  phases: [
    {
      name: "Fundamentals of Computer Networks",
      level: "foundation",
      tagline: "How bits travel across the world",
      desc: "Before you secure networks or optimize them, understand how they work at every layer. The OSI and TCP/IP models aren't just theory — they're the blueprint for every network interaction you'll ever debug.",
      topics: [
        {
          name: "Physical & Data Link Layers",
          tag: "core",
          desc: "Signals: analog vs digital, modulation (ASK, FSK, PSK, QAM), bit rate vs baud rate. Ethernet: CSMA/CD, frame structure (preamble, SFD, dest/src MAC, EtherType, FCS), switching (MAC learning, aging, spanning tree protocol). ARP: how IP becomes MAC, gratuitous ARP, ARP spoofing. VLANs: 802.1Q tagging, trunk ports, VTP.",
          master: [
            "Calculate maximum throughput for a given QAM constellation and bandwidth",
            "Explain why Ethernet uses exponential backoff (truncated binary exponential backoff)",
            "Capture and dissect an ARP request/response using tcpdump/Wireshark",
            "Demonstrate how a switch learns MAC addresses with a lab (Cisco Packet Tracer or physical)",
            "Explain STP (802.1D) convergence: root bridge election, port roles (root/designated/alternate)",
            "Configure VLANs and inter-VLAN routing (router-on-a-stick)",
            "Understand the difference between collision domain and broadcast domain"
          ],
          code: "# ARP request using Scapy\nfrom scapy.all import Ether, ARP, srp\n\ndef arp_scan(ip_range):\n    arp = ARP(pdst=ip_range)\n    ether = Ether(dst='ff:ff:ff:ff:ff:ff')\n    packet = ether / arp\n    result = srp(packet, timeout=3, verbose=0)[0]\n    clients = []\n    for sent, received in result:\n        clients.append({'ip': received.psrc, 'mac': received.hwsrc})\n    return clients\n\n# Usage: arp_scan('192.168.1.0/24')",
          res: [
            "Computer Networking: A Top-Down Approach (Kurose & Ross)",
            "TCP/IP Illustrated Vol 1 (Stevens)",
            "Wireshark Network Analysis (Chappell)",
            "IEEE 802.3 Ethernet standard (sections on CSMA/CD)"
          ]
        },
        {
          name: "IP & Routing Fundamentals",
          tag: "core",
          desc: "IPv4 addressing: subnetting (CIDR, VLSM), private addresses (RFC 1918), broadcast, network/host bits. IPv6: 128-bit addressing, notation, types (unicast, anycast, multicast), autoconfiguration (SLAAC, DHCPv6). ICMP: ping, traceroute (TTL expiration), Path MTU discovery. Routing: static routes, default gateway, administrative distance. IP fragmentation (problems and PMTUD). NAT (static, dynamic, PAT).",
          master: [
            "Perform VLSM subnetting manually: given /24, create subnets for 60, 30, 12 hosts",
            "Calculate shortest IPv6 address representation and expand compressed form",
            "Explain how traceroute works using ICMP TTL exceeded messages",
            "Configure static routing on Cisco/Juniper/MikroTik with backup routes (floating static)",
            "Understand the problems with IP fragmentation and why PMTUD is essential",
            "Set up source NAT (SNAT) and destination NAT (DNAT) on iptables/nftables",
            "Capture and analyze a traceroute using Wireshark"
          ],
          code: "# IP subnet calculator\nimport ipaddress\n\ndef analyze_subnet(cidr):\n    net = ipaddress.ip_network(cidr, strict=False)\n    print(f\"Network: {net.network_address}\")\n    print(f\"Netmask: {net.netmask}\")\n    print(f\"Broadcast: {net.broadcast_address}\")\n    print(f\"First usable: {net.network_address + 1}\")\n    print(f\"Last usable: {net.broadcast_address - 1}\")\n    print(f\"Total hosts: {net.num_addresses}\")\n    print(f\"Usable hosts: {net.num_addresses - 2}\")\n    return net\n\n# Example: analyze_subnet('10.0.0.0/23')",
          res: [
            "RFC 791 (IPv4) and RFC 8200 (IPv6) — original specs",
            "Practical Networking (practicalnetworking.net)",
            "Routing TCP/IP Vol 1 (Doyle)",
            "IP Subnetting Practice (subnettingpractice.com)"
          ]
        },
        {
          name: "TCP & UDP Deep Dive",
          tag: "core",
          desc: "TCP: three-way handshake (SYN, SYN-ACK, ACK), sequence numbers, acknowledgement, windowing (flow control), sliding window algorithm. Congestion control: slow start, congestion avoidance, fast retransmit, fast recovery. TCP variants (Reno, Cubic, BBR). State diagram (LISTEN, SYN-SENT, ESTABLISHED, FIN-WAIT, etc.). Timers (retransmission, persist, keepalive). UDP: connectionless, datagram boundaries, checksum, when to use over TCP.",
          master: [
            "Explain each step of TCP three-way handshake with sequence numbers",
            "Calculate congestion window evolution for TCP Reno given packet loss",
            "Analyze a TCP flow in Wireshark: identify retransmissions, duplicate ACKs, window updates",
            "Explain TCP Fast Open (TFO) and how it reduces latency",
            "Implement a simple TCP client/server in C using sockets with error handling",
            "Understand TCP_NODELAY (disable Nagle's algorithm) and when to use it",
            "Explain the differences between TCP Cubic and TCP BBR"
          ],
          code: "# TCP congestion control simulation (simplified)\nclass TCPReno:\n    def __init__(self):\n        self.cwnd = 1  # congestion window (packets)\n        self.ssthresh = 64  # slow start threshold\n        self.state = 'slow_start'\n    \n    def on_ack(self):\n        if self.state == 'slow_start':\n            self.cwnd += 1\n            if self.cwnd >= self.ssthresh:\n                self.state = 'congestion_avoidance'\n        else:  # congestion avoidance\n            self.cwnd += 1 / self.cwnd\n    \n    def on_loss(self):\n        self.ssthresh = self.cwnd / 2\n        self.cwnd = 1\n        self.state = 'slow_start'\n\n# Simulate: reno = TCPReno()",
          res: [
            "TCP/IP Illustrated Vol 1 (Stevens) — TCP chapters",
            "TCP Congestion Control (RFC 5681)",
            "BBR: Congestion-Based Congestion Control (Google 2016)",
            "High Performance Browser Networking (Grigorik — free online)"
          ]
        }
      ]
    },
    {
      name: "Routing Protocols & Dynamic Routing",
      level: "intermediate",
      tagline: "How networks find each other",
      desc: "Static routing doesn't scale. Master the dynamic protocols that run the internet: OSPF inside autonomous systems, BGP between them. Understand convergence, metrics, and path selection.",
      topics: [
        {
          name: "OSPF — Link State Routing",
          tag: "core",
          desc: "Link State Advertisement (LSA) flooding, Dijkstra's SPF algorithm, areas (backbone area 0, regular, stub, NSSA), router types (internal, ABR, ASBR). OSPF packet types: Hello (DR/BDR election), Database Description, Link State Request, Update, Ack. Metrics (cost based on bandwidth), authentication (plain text, MD5, SHA). OSPFv3 for IPv6.",
          master: [
            "Implement Dijkstra's shortest path algorithm from scratch for network graphs",
            "Configure multi-area OSPF on routers with redistribution between areas",
            "Explain LSA types: Type 1 (Router), Type 2 (Network), Type 3 (Summary), Type 4 (ASBR), Type 5 (External)",
            "Demonstrate how OSPF elects DR and BDR on a multi-access network",
            "Troubleshoot OSPF adjacencies: show ip ospf neighbor, debug ip ospf events",
            "Understand OSPF stub areas: why they block Type 4/5 LSAs and use default routes",
            "Configure OSPF authentication (MD5) between routers"
          ],
          code: "# Dijkstra's algorithm for OSPF shortest path\ndef dijkstra(graph, start):\n    distances = {node: float('infinity') for node in graph}\n    distances[start] = 0\n    visited = set()\n    \n    while len(visited) < len(graph):\n        # Find unvisited node with smallest distance\n        current = min([node for node in graph if node not in visited], \n                     key=lambda n: distances[n])\n        visited.add(current)\n        \n        for neighbor, weight in graph[current].items():\n            new_dist = distances[current] + weight\n            if new_dist < distances[neighbor]:\n                distances[neighbor] = new_dist\n    \n    return distances\n\n# Example: graph = {'R1': {'R2': 1, 'R3': 5}, 'R2': {'R1': 1, 'R3': 2}, 'R3': {...}}",
          res: [
            "OSPF: Anatomy of an Internet Routing Protocol (Moy — original author)",
            "RFC 2328 (OSPFv2), RFC 5340 (OSPFv3)",
            "Cisco OSPF Command Reference",
            "FRRouting (FRR) OSPF implementation source code"
          ]
        },
        {
          name: "BGP — Border Gateway Protocol",
          tag: "advanced",
          desc: "The protocol that runs the internet. eBGP (between ASes) vs iBGP (within AS). Path attributes: AS_PATH (loop prevention, prepending), NEXT_HOP, LOCAL_PREF, MED, communities. BGP route selection algorithm (13 steps!). Route reflectors, confederations for iBGP scaling. BGP security: RPKI, prefix filtering, max-prefix limit, BGP Flowspec for DDoS mitigation.",
          master: [
            "Set up eBGP peering between two routers in different AS numbers",
            "Manipulate BGP path selection using AS_PATH prepending and LOCAL_PREF",
            "Explain the complete BGP best path algorithm (Cisco/Juniper order)",
            "Configure BGP route reflector to reduce iBGP full-mesh requirements",
            "Understand BGP communities: well-known (NO_EXPORT, NO_ADVERTISE, LOCAL_AS) and custom",
            "Implement prefix filtering to prevent route leaks and hijacks",
            "Analyze a BGP routing table using looking glass servers (route-views, bgp.tools)"
          ],
          code: "# BGP route selection (simplified)\ndef select_best_route(routes):\n    # Sort by preference (highest LOCAL_PREF first)\n    routes.sort(key=lambda r: r['local_pref'], reverse=True)\n    \n    # Shortest AS_PATH\n    routes.sort(key=lambda r: len(r['as_path'].split()))\n    \n    # Lowest ORIGIN type (IGP < EGP < incomplete)\n    origin_order = {'igp': 0, 'egp': 1, 'incomplete': 2}\n    routes.sort(key=lambda r: origin_order[r['origin']])\n    \n    # Lowest MED\n    routes.sort(key=lambda r: r.get('med', 0))\n    \n    # eBGP over iBGP, lowest IGP metric to NEXT_HOP, oldest route, lowest Router ID\n    return routes[0] if routes else None",
          res: [
            "BGP4 (RFC 4271)",
            "BGP Design and Implementation (Randy Zhang, Micah Bartell)",
            "BGP Best Path Selection Algorithm (Cisco Documentation)",
            "RouteViews Project (archive of global BGP tables)"
          ]
        },
        {
          name: "MPLS & Traffic Engineering",
          tag: "advanced",
          desc: "Multiprotocol Label Switching: forwarding based on labels instead of IP headers. LDP (Label Distribution Protocol), RSVP-TE (Traffic Engineering). MPLS VPNs: L3VPN (VRF, RD, RT), L2VPN (VPWS, VPLS). Segment Routing (SR-MPLS, SRv6): source-routed paths, adjacency/node SIDs, TI-LFA (Topology Independent Loop-Free Alternate).",
          master: [
            "Explain the difference between IP routing (hop-by-hop) and MPLS (label switching)",
            "Configure MPLS LDP on a small network and verify label bindings",
            "Understand MPLS label stack: push, swap, pop operations",
            "Set up MPLS L3VPN between two customer sites across a provider network",
            "Explain how MPLS Traffic Engineering uses RSVP to establish bandwidth-guaranteed paths",
            "Compare MPLS with Segment Routing (SR-MPLS) advantages",
            "Implement TI-LFA for sub-50ms failover in an MPLS network"
          ],
          res: [
            "MPLS: Technology and Applications (Davie, Farrel)",
            "MPLS Fundamentals (Luc De Ghein)",
            "Segment Routing Architecture (RFC 8402)",
            "Juniper MPLS Series (TechLibrary)"
          ]
        }
      ]
    },
    {
      name: "Network Security",
      level: "advanced",
      tagline: "Defend the perimeter and beyond",
      desc: "Networks are the primary attack surface. Master firewalls, IDS/IPS, VPNs, and security architectures. Understand attacks at every layer and how to stop them.",
      topics: [
        {
          name: "Firewalls & ACLs",
          tag: "core",
          desc: "Stateless packet filtering: ACLs (standard vs extended), implicit deny, rule ordering. Stateful inspection: tracking connection state, TCP sequence number verification, ALGs for FTP/SIP. Next-Gen Firewalls (NGFW): application identification (L7), user identity, SSL/TLS inspection. Zone-based firewalls (ZBF). iptables/nftables for Linux, pf for BSD, Windows Firewall.",
          master: [
            "Write iptables rules to allow SSH (port 22) only from a specific subnet",
            "Explain the difference between stateful and stateless firewalls with examples",
            "Configure zone-based firewall on Cisco/Juniper with multiple security zones",
            "Implement NAT + firewall on a Linux router (iptables masquerade + FORWARD rules)",
            "Understand firewall rule order: why most specific rules should come first",
            "Perform firewall rule optimization and hit-count analysis",
            "Set up NGFW application filtering to block BitTorrent while allowing HTTP/HTTPS"
          ],
          code: "#!/bin/bash\n# Basic iptables firewall script\nIPTABLES='iptables'\n\n# Flush existing rules\n$IPTABLES -F\n$IPTABLES -X\n\n# Default policies\n$IPTABLES -P INPUT DROP\n$IPTABLES -P FORWARD DROP\n$IPTABLES -P OUTPUT ACCEPT\n\n# Allow loopback\n$IPTABLES -A INPUT -i lo -j ACCEPT\n\n# Allow established connections\n$IPTABLES -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT\n\n# Allow SSH from management subnet\n$IPTABLES -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT\n\n# Allow HTTP/HTTPS from anywhere\n$IPTABLES -A INPUT -p tcp --dport 80 -j ACCEPT\n$IPTABLES -A INPUT -p tcp --dport 443 -j ACCEPT\n\n# Log dropped packets\n$IPTABLES -A INPUT -j LOG --log-prefix \"IPTABLES-DROP: \" --log-level 4",
          res: [
            "Linux Firewalls (Michael Rash)",
            "pfSense documentation (open source firewall)",
            "iptables Tutorial (Oskar Andreasson)",
            "NGFW concepts (Palo Alto, Fortinet documentation)"
          ]
        },
        {
          name: "VPN Technologies",
          tag: "core",
          desc: "Site-to-site vs remote access VPNs. IPsec: AH (authentication, deprecated), ESP (encryption+auth), IKEv1/IKEv2 (key exchange), tunnel vs transport mode. SSL/TLS VPNs: OpenVPN (SSL/TLS on custom port), WireGuard (modern, simpler, faster). L2TP/IPsec (legacy). DMVPN (Dynamic Multipoint VPN, mGRE+NHRP+IPsec) for hub-spoke with spoke-spoke tunnels.",
          master: [
            "Set up a WireGuard VPN between two Linux servers in 5 minutes",
            "Explain IPsec IKE phases: Phase 1 (ISAKMP SA) and Phase 2 (IPsec SA)",
            "Configure OpenVPN with certificate authentication and client configs",
            "Understand tunnel vs transport mode in IPsec: when to use each",
            "Set up DMVPN Phase 2 with EIGRP routing over IPsec tunnels",
            "Implement split tunneling vs full tunneling in remote access VPN",
            "Analyze IPsec packet captures to see ESP headers and trailers"
          ],
          code: "# WireGuard config example\n# /etc/wireguard/wg0.conf\n[Interface]\nAddress = 10.0.0.1/24\nPrivateKey = <server-private-key>\nListenPort = 51820\nPostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE\nPostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE\n\n[Peer]\nPublicKey = <client-public-key>\nAllowedIPs = 10.0.0.2/32\n\n# Client config\n[Interface]\nAddress = 10.0.0.2/24\nPrivateKey = <client-private-key>\nDNS = 8.8.8.8\n\n[Peer]\nPublicKey = <server-public-key>\nEndpoint = vpn.example.com:51820\nAllowedIPs = 0.0.0.0/0",
          res: [
            "IPsec RFCs (4301, 4302, 4303, 5996 for IKEv2)",
            "WireGuard: Next Generation Kernel Network Tunnel (Donenfeld)",
            "OpenVPN documentation and sample configs",
            "DMVPN Design Guide (Cisco)"
          ]
        },
        {
          name: "IDS/IPS & Network Monitoring",
          tag: "advanced",
          desc: "Intrusion Detection (passive monitoring) vs Intrusion Prevention (inline blocking). Signature-based (Snort, Suricata) vs anomaly-based. Zeek (formerly Bro) for network analysis framework. Protocol analysis, flow data (NetFlow, sFlow, IPFIX). SIEM integration (Splunk, ELK).",
          master: [
            "Install and configure Snort/Suricata to detect port scans",
            "Write a custom Snort rule to detect a specific exploit pattern",
            "Set up Zeek to monitor HTTP traffic and extract all requested URLs",
            "Configure NetFlow export from a router and analyze with ntopng or Elastiflow",
            "Explain the difference between inline and promiscuous mode for IDS/IPS",
            "Implement automated alerting with ELK stack (Elasticsearch, Logstash, Kibana)",
            "Perform PCAP analysis to identify C2 beaconing patterns"
          ],
          code: "# Snort custom rule example\nalert tcp $HOME_NET any -> $EXTERNAL_NET 443 \n(msg:\"Potential C2 Beacon - Suspicious TLS SNI\"; \nflow:to_server,established; \ncontent:\"|16|\"; depth:1; \ncontent:\"example-malware.com\"; nocase; \nmetadata:service ssl; \nclasstype:trojan-activity; \nsid:1000001; rev:1;)\n\n# Zeek script to log HTTP user-agents\nevent http_request(c: connection, method: string, original_URI: string, \n                   version: string, hdr: HTTP_header)\n    {\n    print fmt(\"%s - %s - %s\", c$id$orig_h, method, original_URI);\n    if (hdr$user-agent != \"\")\n        print fmt(\"  User-Agent: %s\", hdr$user-agent);\n    }",
          res: [
            "Snort Users Manual",
            "Zeek (Bro) Scripting documentation",
            "The Practice of Network Security Monitoring (Richard Bejtlich)",
            "Suricata: High Performance IDS/IPS documentation"
          ]
        }
      ]
    },
    {
      name: "Advanced Network Architectures",
      level: "expert",
      tagline: "Design networks that never fail",
      desc: "Beyond basic routing and switching. Software-Defined Networking (SDN), network automation, high availability, and modern data center fabrics.",
      topics: [
        {
          name: "SDN & OpenFlow",
          tag: "advanced",
          desc: "Control plane vs data plane separation. OpenFlow protocol: flow tables, match-action, packet-in/packet-out. SDN controllers: OpenDaylight, ONOS, Ryu, POX. Network virtualization: VXLAN (encapsulation, VTEPs), NVGRE, Geneve. Programmability: RESTCONF, NETCONF, YANG data models.",
          master: [
            "Set up a Mininet emulated network with Open vSwitch and a remote SDN controller",
            "Write a simple Ryu controller that implements L2 learning switch functionality",
            "Explain how VXLAN tunnels L2 frames over L3 networks (encapsulation in UDP)",
            "Configure OVS (Open vSwitch) flow entries to forward based on VLAN and MAC",
            "Understand OpenFlow 1.3 vs 1.0: multiple tables, groups, meters",
            "Implement traffic steering using SDN: redirect specific flows to a middlebox",
            "Use NETCONF with YANG to program a network device"
          ],
          code: "# Ryu SDN controller — L2 learning switch\nfrom ryu.base import app_manager\nfrom ryu.controller import ofp_event\nfrom ryu.controller.handler import CONFIG_DISPATCHER, MAIN_DISPATCHER\nfrom ryu.controller.handler import set_ev_cls\nfrom ryu.ofproto import ofproto_v1_3\nfrom ryu.lib.packet import packet, ethernet, ether_types\n\nclass L2Switch(app_manager.RyuApp):\n    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]\n\n    def __init__(self, *args, **kwargs):\n        super(L2Switch, self).__init__(*args, **kwargs)\n        self.mac_to_port = {}\n\n    @set_ev_cls(ofp_event.EventOFPSwitchFeatures, CONFIG_DISPATCHER)\n    def switch_features_handler(self, ev):\n        datapath = ev.msg.datapath\n        ofproto = datapath.ofproto\n        parser = datapath.ofproto_parser\n\n        match = parser.OFPMatch()\n        actions = [parser.OFPActionOutput(ofproto.OFPP_CONTROLLER, ofproto.OFPCML_NO_BUFFER)]\n        self.add_flow(datapath, 0, match, actions)\n\n    def add_flow(self, datapath, priority, match, actions):\n        ofproto = datapath.ofproto\n        parser = datapath.ofproto_parser\n        inst = [parser.OFPInstructionActions(ofproto.OFPIT_APPLY_ACTIONS, actions)]\n        mod = parser.OFPFlowMod(datapath=datapath, priority=priority, match=match, instructions=inst)\n        datapath.send_msg(mod)",
          res: [
            "Software-Defined Networking: A Comprehensive Survey (Kreutz et al.)",
            "OpenFlow Switch Specification (Open Networking Foundation)",
            "Mininet Walkthrough (mininet.org)",
            "Ryu SDN Framework documentation"
          ]
        },
        {
          name: "Network Automation & DevOps",
          tag: "advanced",
          desc: "Infrastructure as Code for networks. Ansible (network modules: ios_config, junos_config, eos_config), Python libraries (Netmiko, NAPALM, Nornir), REST APIs on modern devices. Configuration management: version control (Git), CI/CD pipelines, automated testing (Batfish for configuration validation).",
          master: [
            "Write an Ansible playbook to configure OSPF on 10 routers simultaneously",
            "Use Netmiko to connect to a device, execute commands, and parse output",
            "Implement a Python script to backup all device configs daily to Git",
            "Set up a CI/CD pipeline for network config changes (GitOps with Arista CloudVision)",
            "Use Batfish to validate that no ACL blocks SSH before deployment",
            "Implement automated remediation: if BGP neighbor down, rollback to last known good config",
            "Create a network inventory system with NetBox or Nautobot"
          ],
          code: "# Netmiko example: automate Cisco config backup\nfrom netmiko import ConnectHandler\nfrom datetime import datetime\nimport os\n\ndef backup_device(device_dict):\n    try:\n        connection = ConnectHandler(**device_dict)\n        output = connection.send_command('show running-config')\n        connection.disconnect()\n        \n        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')\n        filename = f\"backups/{device_dict['host']}_{timestamp}.cfg\"\n        os.makedirs('backups', exist_ok=True)\n        \n        with open(filename, 'w') as f:\n            f.write(output)\n        print(f\"Backed up {device_dict['host']} to {filename}\")\n    except Exception as e:\n        print(f\"Failed to backup {device_dict['host']}: {e}\")\n\n# Example usage\nrouter = {\n    'device_type': 'cisco_ios',\n    'host': '192.168.1.1',\n    'username': 'admin',\n    'password': 'secret',\n    'secret': 'enable_secret'\n}\n# backup_device(router)",
          res: [
            "Network Programmability and Automation (O'Reilly)",
            "Ansible Network Documentation",
            "Netmiko (Kirk Byers) GitHub and docs",
            "Batfish: Network Configuration Analysis"
          ]
        },
        {
          name: "Data Center Fabrics & EVPN-VXLAN",
          tag: "expert",
          desc: "Modern data center networking. Clos fabrics (spine-leaf architecture), ECMP for load balancing. VXLAN for overlay networks, BGP EVPN as control plane (Type 2, Type 3, Type 5 routes). MAC mobility, anycast gateway. Cisco ACI, VMware NSX, Juniper Apstra.",
          master: [
            "Design a 3-stage Clos fabric with 4 spines, 8 leaves for 1,000+ servers",
            "Explain how VXLAN extends Layer 2 across Layer 3 boundaries",
            "Configure BGP EVPN with Type 2 routes for MAC/IP advertisement between VTEPs",
            "Understand anycast gateway: same VIP on all leaf switches for default gateway",
            "Implement MAC mobility and understand how EVPN prevents loops",
            "Deploy a VXLAN EVPN fabric with FRRouting (open source) on Linux",
            "Troubleshoot VXLAN data plane: check VTEP reachability, VNI consistency"
          ],
          code: "# FRRouting (FRR) EVPN configuration snippet\n# VTEP configuration\nvtysh -c \"conf t\" \\\n       -c \"hostname leaf1\" \\\n       -c \"interface loopback0\" \\\n       -c \"ip address 10.0.0.1/32\" \\\n       -c \"exit\" \\\n       -c \"interface vlan10\" \\\n       -c \"ip address 192.168.10.1/24\" \\\n       -c \"exit\" \\\n       -c \"router bgp 65000\" \\\n       -c \"bgp router-id 10.0.0.1\" \\\n       -c \"neighbor 10.0.0.101 remote-as 65000\" \\\n       -c \"neighbor 10.0.0.101 update-source loopback0\" \\\n       -c \"address-family l2vpn evpn\" \\\n       -c \"neighbor 10.0.0.101 activate\" \\\n       -c \"advertise-all-vni\" \\\n       -c \"exit\" \\\n       -c \"exit\" \\\n       -c \"end\"",
          res: [
            "Building Modern Data Centers with BGP EVPN-VXLAN (Cisco Live presentation)",
            "RFC 7432 (BGP MPLS-Based Ethernet VPN)",
            "FRRouting EVPN documentation",
            "Juniper EVPN-VXLAN Fabric Design Guide"
          ]
        }
      ]
    }
  ]
};