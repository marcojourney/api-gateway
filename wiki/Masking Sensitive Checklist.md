Great question. Masking sensitive data in financial systems is a **critical practice**, especially in industries where data privacy and compliance (e.g., PCI-DSS, GDPR, SOX) are non-negotiable. Here are the **techniques** most **giant companies** use:

---

### ✅ **1. Data Masking Techniques**

#### 🔒 **Static Data Masking (SDM)**

* Used for **non-production** environments like staging or testing.
* Irreversibly replaces sensitive data with fake but realistic data.
* Example: Replace real account numbers with fake ones before populating test DBs.

#### 🔄 **Dynamic Data Masking (DDM)**

* Applied **at query runtime**, especially on production systems.
* Doesn’t alter the underlying data, only the output for unauthorized users.
* Example in SQL Server:

  ```sql
  CREATE TABLE Customers (
    CreditCardNumber varchar(20) MASKED WITH (FUNCTION = 'partial(0,"XXXX-XXXX-XXXX-",4)')
  );
  ```

---

### ✅ **2. Field-Level Encryption & Tokenization**

#### 🔐 **Field-Level Encryption**

* Encrypts sensitive fields (like `PAN`, `SSN`, `CVV`, `PIN`) individually.
* Requires proper key management (e.g., HSMs or KMS like AWS KMS, HashiCorp Vault).

#### 🪙 **Tokenization**

* Replaces sensitive data with **non-sensitive tokens**.
* Original data is stored in a secure vault.
* Used heavily in **PCI-compliant systems** (e.g., card payments).

---

### ✅ **3. Role-Based Access Control (RBAC) + Data Redaction**

* Only users with specific roles can view full data.
* Others see partially masked or redacted data.

```json
// Example API response
{
  "accountHolder": "John Doe",
  "cardNumber": "**** **** **** 1234",
  "ssn": "XXX-XX-4321"
}
```

---

### ✅ **4. API Gateway Middleware for Masking**

* Middleware logic in **API gateways** (e.g., Kong, Apigee, custom NestJS proxy) to mask data **before sending to clients**.

**Example in NestJS**:

```ts
function maskCardNumber(cardNumber: string): string {
  return cardNumber.replace(/\d(?=\d{4})/g, '*');
}
```

---

### ✅ **5. Logs and Monitoring Masking**

* Ensure **logs do not expose sensitive data**.
* Use tools like **Datadog, ELK, Splunk** with data masking plugins or regex filters.

---

### ✅ **6. Database Views & Virtual Columns**

* Use views to expose **only masked data**.
* Prevent direct access to real sensitive columns.

---

### ✅ **7. Masking in CI/CD Pipelines**

* Automatically mask secrets in config files or outputs in pipelines.
* Example:

  * GitHub Actions → `secrets.*`
  * GitLab → `masked: true` for secret variables

---

### 🏢 Common Tools Used by Giants

| Tool                                      | Purpose                                 |
| ----------------------------------------- | --------------------------------------- |
| **AWS KMS / Azure Key Vault**             | Encryption key management               |
| **HashiCorp Vault**                       | Secrets and token management            |
| **Dataguise / Protegrity / IBM Guardium** | Enterprise-level data masking platforms |
| **Apache Ranger + Hive Masking**          | Big Data field-level masking            |
| **Snowflake**                             | Built-in dynamic masking and RBAC       |

---

### 📌 Best Practices Summary

* **Encrypt** data at rest & in transit.
* Apply **masking at both DB & API levels**.
* Use **tokenization** for PCI or payment data.
* Restrict access using **RBAC**.
* Never log sensitive values in plaintext.
