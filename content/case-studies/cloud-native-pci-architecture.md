---
slug: "cloud-native-pci-architecture"
title: "Building a Cloud-Native PCI DSS Level 1 Architecture"
industry: "Fintech / Payments"
heroImage: "/case-studies/cloud-native-pci-architecture/heroimage.jpg"
problemStatement: |
  FSSTech wanted a next gen payments product that needs to process and store cardholder data, including card numbers and expiry date. The product needed to be compliant with the Payment Card Industry (PCI) standards.

  Our main challenge was to create a cloud-native payment product that achieves the highest level of certification, which is PCI DSS Level 1.
clientInfo: "FSSTech, an Indian fintech company, specializes in payments solutions, including ATM services and digital banking, with an estimated revenue of $200 million."
clientImage: "/case-studies/cloud-native-pci-architecture/clientLogo.png"
outcomes:
  - outcome: "Designed a lean Card Data Environment (CDE) to minimize the security perimeter."
    icon: "/case-studies/cloud-native-pci-architecture/credit-card.png"
  - outcome: "Created a Cloud Native PCI DSS Level 1 certified payment solution."
    icon: "/case-studies/cloud-native-pci-architecture/outcome-pci.png"
expertises: ["backend-engineering", "cloud-devops", "security-engineering"]
technologies:
  - tech: "iframe"
    purpose: "capture & transmit cardholder data securely over TLS 1.2"
  - tech: "kubernetes"
    purpose: "container orchestration"
  - tech: "cloudkey"
    purpose: "encrypt & decrypt cardholder data"
  - tech: "cloudfirewall"
    purpose: "controling incoming and outgoing network traffic"
  - tech: "cloudarmor"
    purpose: "Web Application Firewall"
  - tech: "githubactions"
    purpose: "Continuous Integration"
  - tech: "cloudrun"
    purpose: "for Continuous Deployment"
  - tech: "dockercontainer"
    purpose: "scanning Docker images for known vulnerabilities"
  - tech: "terraform"
    purpose: "maintaining infrastructure as code"
  - tech: "helmcharts"
    purpose: "manageing files related to Kubernetes resources"
  - tech: "brakeman"
    purpose: "static code analyzer"
  - tech: "Audit Log"
    purpose: "recording administrative activities and accesses"
  - tech: "istio"
    purpose: "securing service-to-service communication (mTLS)"
  - tech: "cloudlog"
    purpose: "centralize all logging"
# testimonial:
#   quote: ""
#   author: ""
#   authorImage: "/case-studies/cloud-native-pci-architecture/client-author.jpg"
---


### How did BeautifulCode do it?

To effectively manage our compliance requirements, we first aimed to narrow down the range of system components subjected to PCI DSS audit, namely the Card Data Environment (CDE). The CDE refers to the areas of our network where cardholder data is stored, processed, or transmitted. Our strategy was to minimize the risk of exposing cardholder data, streamline the audit process, and simplify the maintenance of security for components within the PCI DSS scope.

We designed the architecture by dividing services into two distinct groups:

- **In-scope (CDE):** services directly involved with cardholder data such as payments, risk analysis, etc.  
- **Out-of-scope:** services not directly handling cardholder data (e.g., Settlements service, Transaction service with only masked cardholder data).

This approach allowed us to deploy these groups in their respective Kubernetes clusters and subnets, shared within a common Virtual Private Cloud (VPC).

<figure>
  <img src="/case-studies/cloud-native-pci-architecture/generalized_architecture _diagram.png" alt="Generalised Architecure diagram" />
  <figcaption>
    Generalised Architecure Diagram
  </figcaption>
</figure>

Here are the key implementations we carried out to address each PCI DSS requirements:


### Install and maintain a firewall configuration to protect cardholder data  
We implemented Cloud Firewall ingress rules to block traffic on all ports except
port 443, which remained open for secure SSL traffic to the app. For outgoing
traffic, we established egress rules to block all outbound communication from the
subnet, whitelisting only necessary traffic such as calls to the Payment Gateway,
Plaid/Mx, etc., to exit the VPC subnet. Additionally, we put processes in place to
require two levels of approval for any changes to the firewall rules.

We also used Cloud Armor as a Web Application Firewall (WAF) to prevent DDoS
attacks, SQL injection, cross site scripting (XSS), cross site request forgery (CSRF),
etc.

### Do not use vendor-supplied defaults for system passwords and other security parameters  

We built our Docker images using Ubuntu Alpine as the base and installed only the
required packages to run our applications.

We ensured that we avoided using any default configurations and passwords
provided by vendors. For example, in the case of databases, we generated
database passwords using Terraform scripts and stored them as Kubernetes
secrets. These secrets were loaded only into the deployments/pods that required
them. This approach ensured that access to the database password was restricted
solely to the pods that needed it.

### Protect stored cardholder data  
We removed personally identifiable information (PII), CVV, card numbers, and
expiry dates from logs. The cardholder data was encrypted using Cloud Key
Management before being stored in the database. Additionally, we delayed the
decryption of this data until absolutely necessary, such as just before making a call
to the Payment Gateway for processing a transaction. We also rotated the
encryption keys every three months, re encrypting all the cardholder data with the
new keys.

Our strict data retention policy mandated the deletion of all cardholder data if a
user chose to remove their card from the system.

Wherever possible, we conducted various operations on the cardholder data by
using either the masked value or a one way hashed value of the card number,
employing strong one way hashing algorithms like SHA-512.

We also ensured that the CVV was not stored in any form, including logs,
databases, or files.


### Encrypt transmission of cardholder data across open, public networks   

We have implemented HTTPS and TLS 1.2 to ensure encryption of all incoming
traffic. Additionally, we ve utilized Istio service mesh to secure all service to service
communications using mutual TLS (mTLS).


### Protect all systems against malware and regularly update anti-virus software or programs  

We have installed specialized antivirus software on all our Linux and macOS
systems to comply with the PCI DSS requirement for protection against malware.
This software is regularly updated to guard against the latest malware threats.
Additionally, we consistently update our operating systems and applications to
address any security vulnerabilities.

### Develop and maintain secure systems and applications  

We utilized Container Analysis to scan Docker images for known vulnerabilities and
promptly addressed them. Additionally, we implemented cloud functions to detect
any newly discovered vulnerabilities in previously scanned Docker images.

Our developers regularly participated in training sessions focused on OWASP
Secure Coding Practices. We also integrated the static code analyzer Brakeman into
our Continuous Integration (CI) process, which analyzes the code for security
vulnerabilities.

We maintain separate environments for development, staging, and production.
Access to these environments was managed using Cloud IAM, ensuring
appropriate and secure access controls.

### Restrict access to cardholder data by business need to know 

Access to the production environment was restricted to only the lead developer
and the client s product management team. We established Google groups and
assigned the minimum necessary permissions for task execution. Users were
added to these groups based on their roles.

To minimize the need for direct infrastructure access from local systems, we
implemented a Continuous Deployment (CD) process using Cloud Run, forcing the
use of GCP tools to access the infrastructure.


### Identify and authenticate access to system components  

Using Cloud IAM, we enforced security measures including 2FA, strong password
policies, account locking after multiple incorrect password attempts, setting user
session times, and establishing password reset and rotation processes.
Additionally, we implemented procedures for locking user emails upon
termination.


### Restrict physical access to cardholder data  

Google is responsible for physical security controls on all Google data centers
underlying Google Cloud.

### Track and monitor all access to network resources and cardholder data

We utilized the Audit Log for monitoring all access to network resources and
employed Cloud Logging to collect and centralize all application logs in the Logs
Dashboard


### Regularly test security systems and processes

We utilized JIRA to schedule tickets for recurring activities such as Internal
Penetration Testing (IPT), External Penetration Testing (EPT), scanning by Approved
Scanning Vendors (ASV), Segmentation Penetration Testing (SPT), Internal
Vulnerability Testing (IVT), and Application Penetration Testing (APT).

These activities were conducted with the assistance of internal teams, external
teams, and Qualified Security Assessors (QSA). In cases where issues were
identified during these activities, we created Priority 0 (P0) tickets and swiftly
addressed the resolutions.


### Maintain a policy that addresses information security for all personnel  

We had kept all our information security policies and related documentation up to
date on Confluence.

