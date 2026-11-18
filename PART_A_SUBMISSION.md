# Coy SDE Intern Assignment: Part A Proposals & Product Teardown

**Candidate**: Raphel  
**Target Role**: SDE Intern  
**Repository**: [github.com/Raphel6969/coy-discover-assignment](https://github.com/Raphel6969/coy-discover-assignment)  
**Live Application Analyzed**: [getcoy.com](https://getcoy.com/) & [app.getcoy.com](https://app.getcoy.com/)

---

## 1. Product Thesis & Mental Model

Coy’s core value proposition is **asymmetric risk elimination in real-world social circles**. 

Unlike conventional dating apps (Tinder, Bumble, Hinge) where strangers meet through public profiles and algorithmic recommendations, Coy is built for **people who already know each other in real life** (college batches, hostels, coworkers, alumni, friend groups). In these environments, confessing romantic interest carries severe social liability: fear of rejection, awkward group dynamics, gossip, and damaged friendships.

Coy resolves this through **cryptographic double-blind matching**:
1. You add a crush by Phone, WhatsApp, Instagram, or Email.
2. The recipient gets an anonymous ping (*"Someone in your circle added you as their crush on Coy..."*).
3. If and only if they independently add you too, a mutual match is announced.
4. If unrequited, the secret is preserved permanently.

---

## 2. Part A: Suggest Two Core Features

### Feature 1: The "Admirer Funnel Bridge" (Fixing the 53-Admirers vs. 3-Slots Dilemma)

#### The Problem & Retention Cliff
When a user signs up after receiving an anonymous notification that multiple people (e.g., 10, 25, or 53 admirers) have added them, their dopamine and curiosity are at their absolute peak. 

However, upon completing onboarding:
* They are confronted with only **3 empty slots**.
* A **30-day lock** prevents swapping or cycling guesses.
* The mathematical probability of correctly guessing in 3 attempts out of 53 admirers is extremely low ($< 5.7\%$).
* **User Psychology & Churn**: The user feels choice paralysis and helplessness. Realizing that guessing feels like a lottery ticket with 3 tries, most give up and close the app. This turns Coy’s highest-intent viral moment into a dead end.

#### Proposed Solution
1. **Dynamic Onboarding Bonus Slots ("Momentum Onboarding")**:
   * Grant bonus slots scaled to inbound admirer volume (e.g., `+2 bonus slots` if you have $\ge 5$ admirers, capped at $+2$ to preserve scarcity).
   * Having 5 initial guesses gives the user sufficient room to cover their most likely circle suspects, dramatically boosting Day-1 match probability and early dopamine.
2. **Contextual In-Funnel Monetization**:
   * Instead of burying slot purchases in a detached Settings screen, trigger the slot pack offer (`₹199 for +3 slots`) directly on the screen where the admirer count is shown:
     > *"You have 53 admirers in your circle. Unlock 3 more slots to increase your match odds."*
   * This monetizes the user at the exact moment their willingness-to-pay is maximized.

#### Privacy & DPDP Compliance
* No identity hints or timestamps are leaked.
* The 30-day lock remains active on all consumed slots to prevent address-book scraping.
* Maintains 100% cryptographic double-blind integrity.

---

### Feature 2: Sender-Chosen Circle Categorization (Affiliation Metadata)

#### The Problem & Broadness Gap
In the live app, the ping simply states: *"Someone in your circle added you as their crush on Coy."* 

For college students and young professionals who belong to multiple distinct social spheres (College batch, Hostel, Internship/Work, School alumni, Gym/Society), a raw number like "53 admirers" or "Someone" is too ambiguous. Users end up wasting their 3 precious slots guessing people from college when the admirer was actually a colleague from their summer internship.

#### Proposed Solution
1. **Optional Circle Tagging on Add**:
   * When user A enters a crush's identifier, they can optionally tag the affiliation:
     * `🎓 College / Campus`
     * `💼 Work / Tech`
     * `🏫 School / Alumni`
     * `☕ Social / Friends`
2. **Aggregated Distribution Breakdown**:
   * The recipient sees an aggregated breakdown rather than a generic aggregate:
     > *"You have 15 admirers in your circles: 9 from College, 4 from Work, 2 from Social."*
3. **Strategic Slot Allocation**:
   * The recipient can spend 2 slots on college peers and 1 on a coworker, converting wasted guesses into high-confidence mutual matches.

#### Privacy Safeguards ($k$-Anonymity)
* **Sender Discretion**: Circle tagging is strictly optional for the sender.
* **$k$-Anonymity Threshold ($k = 3$)**: If a specific category contains fewer than 3 admirers (e.g., only 1 person from "Work"), that tag is masked and rolled into general *"Social / Other"* to prevent de-anonymizing a single coworker.

---

## 3. Critical Security & Privacy Edge Cases (Teardown of Coy's Email & Settings)

Through analyzing Coy's email notifications and settings flow, two critical vulnerabilities were identified:

### 1. Secondary Identifier Hijacking (Critical Vulnerability)
* **The Vulnerability**: Coy’s transactional emails prompt users:
  > *"Add this email in Settings so they can find you."*
* If adding a secondary phone number, email, or Instagram handle does not require **cryptographic OTP verification** for that specific identifier, an attacker can claim another person's email or phone number inside their own Coy account.
* **Impact**:
  1. The attacker can immediately see the victim's secret admirer count.
  2. If someone adds the victim, the attacker steals the match notification.
* **The Fix**: Mandate an instantaneous OTP verification for **every identifier** before it is indexed in the matching lookup graph.

### 2. Delta Timing & Correlation Attacks on Admirer Counts
* **The Vulnerability**: If Coy sends an email or updates the in-app counter every time a new crush is added (e.g., 52 on Monday, 53 on Tuesday), a recipient who met someone new on Monday night can correlate the increment to that specific individual.
* **The Fix**:
  1. **Coarse Range Bucketing**: Display counts in broad ranges (`5+`, `10+`, `25+`, `50+`, `100+`).
  2. **Throttled Batch Digests**: Deliver admirer count updates on a fixed weekly/bi-weekly schedule, uncoupling the update from the sender's real-world action.

---

## 4. Prioritization Matrix

| Priority | Feature / Fix | Category | Rationale |
| :--- | :--- | :--- | :--- |
| **P0 (Immediate)** | Mandatory OTP for Secondary Identifiers | Security | Prevents account hijacking and unauthorized match interception. |
| **P1 (High)** | The Admirer Funnel Bridge (Bonus Slots + Upsell) | Growth & Revenue | Eliminates the largest user drop-off cliff and monetizes high-intent pings. |
| **P2 (High)** | Sender-Chosen Circle Categorization | User Experience | Dramatically improves guess accuracy and match rate for multi-circle users. |
| **P3 (Medium)** | Coarse Count Bucketing & Digest Throttling | Privacy Defense | Closes the delta timing correlation leak. |
