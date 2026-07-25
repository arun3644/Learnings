# Java String, StringBuffer, StringBuilder — Complete Notes (Moderate → Advanced)

---

## 1. STRING — THE FOUNDATION

### 1.1 What is a String in Java?
- `String` is a class (`java.lang.String`), not a primitive.
- Internally backed by a `char[]` (Java 8 and earlier) or a `byte[]` with a coder flag (Java 9+, due to **Compact Strings**).
- Declared `final` → cannot be subclassed.
- Implements `Serializable`, `Comparable<String>`, `CharSequence`.

### 1.2 Immutability — the core concept
A String object, once created, **cannot be changed**. Any "modification" creates a **new object**.

```java
String s = "hello";
s.concat(" world"); // creates new object, discarded
System.out.println(s); // "hello" — unchanged
```

**Why String is immutable (interview favorite — explain ALL reasons):**
1. **String Pool / Caching** — immutability makes sharing references across the pool safe.
2. **Security** — Strings used in class loading, file paths, network connections, DB URLs. If mutable, a malicious caller could change value after validation but before use (TOCTOU-like bug).
3. **Thread-safety** — immutable objects are inherently thread-safe; no synchronization needed.
4. **Hashcode caching** — `String.hashCode()` is computed once and cached (`private int hash;`), because the value never changes. This makes String an excellent, fast `HashMap` key.
5. **Safe for use as HashMap keys** — combined with #4.

### 1.3 String Pool (String Intern Pool / SCP)
- A special memory area inside the **Heap** (moved from PermGen to Heap in Java 7+).
- String literals are automatically placed here and **reused** if identical value exists.

```java
String a = "abc";       // goes to pool
String b = "abc";       // reuses same pool reference
String c = new String("abc"); // NEW object created on heap (NOT pool), even though "abc" itself is pooled
String d = c.intern();  // forces "abc" from heap object into pool reference

System.out.println(a == b); // true
System.out.println(a == c); // false
System.out.println(a == d); // true
```

**`intern()` method** — advanced point:
- Checks if an equal string exists in the pool.
- If yes, returns the pool reference.
- If no, adds this string's value to the pool and returns that reference.
- Useful for memory optimization when deduplicating large numbers of repeated strings (e.g., parsing huge files with repeated tokens).

### 1.4 String Creation — `new` vs literal (memory diagram in words)
```java
String s1 = "java";              // Pool
String s2 = "java";              // Pool (same ref as s1)
String s3 = new String("java");  // Heap (new object) + "java" literal also in pool
```
- `new String("java")` creates **2 objects** if `"java"` isn't already in pool (1 in pool + 1 in heap), or **1 object** if `"java"` already exists in pool (only the heap object is new).

### 1.5 == vs .equals() vs compareTo()
| Method                   | Compares                                     | Use |
|---                       |---                                           |---|
| `==`                     | Reference (memory address)                   | identity check |
| `.equals()    `          | Content (char by char), overridden in String | value check |
| `.compareTo()`           | Lexicographic order, returns int             | sorting |
| `.compareToIgnoreCase()` | Same, case-insensitive                       | sorting |
| `.equalsIgnoreCase()   ` | Content, case-insensitive                    | value check |

### 1.6 String Concatenation — how `+` really works
```java
String s = "a" + "b" + "c"; // compile-time constant folding → single literal "abc" in pool (javac optimizes)

String x = "a";
String y = x + "b"; // runtime: compiler internally uses StringBuilder.append() then toString()
```
- **Key Rule:** `+` with **all compile-time constants** → resolved at compile time (pool).
- `+` involving a **variable** → compiler transforms into `new StringBuilder().append(...).append(...).toString()` — this is a HUGE interview point because it explains why concatenation in a loop is bad.

```java
// BAD (creates a new StringBuilder in EVERY loop iteration in Java 8; 
// modern JIT/javac may still optimize but conceptually costly, and pre-invokedynamic era definitely bad)
String result = "";
for (int i = 0; i < 10000; i++) {
    result += i;  // new StringBuilder each iteration = O(n^2) behavior
}
```
- Java 9+ uses `invokedynamic` + `StringConcatFactory` for `+` concatenation (more optimized at runtime), but **loop concatenation is still an anti-pattern** — always use `StringBuilder` explicitly in loops.

### 1.7 Compact Strings (Java 9+) — Advanced/JVM-internals topic
- Pre-Java 9: `String` stored as `char[]` → always 2 bytes/char (UTF-16), wasteful for Latin-1/ASCII text.
- Java 9+: `String` stores as `byte[]` + a `coder` field:
  - `LATIN1` (1 byte/char) if all chars fit in Latin-1.
  - `UTF16` (2 bytes/char) otherwise.
- Reduces memory footprint significantly for typical (ASCII-heavy) applications — JEP 254.

### 1.8 Important String Methods (know behavior + time complexity)
| Method | Notes |
|---|---|
| `length()` | O(1) |
| `charAt(i)` | O(1) |
| `substring(begin, end)` | Java 7+ **copies** char array (O(n)) — pre-Java 7 shared backing array (caused memory leaks: a tiny substring held reference to huge original array) |
| `indexOf/lastIndexOf` | O(n) |
| `contains` | uses indexOf internally |
| `split(regex)` | Regex-based, relatively expensive; returns `String[]` |
| `replace(char,char)` / `replace(CharSequence,CharSequence)` | non-regex |
| `replaceAll/replaceFirst` | regex-based |
| `trim()` | removes chars ≤ U+0020 |
| `strip()` (Java 11+) | Unicode-aware whitespace removal (better than trim for Unicode) |
| `isBlank()` (Java 11+) | true if empty or only whitespace |
| `repeat(n)` (Java 11+) | repeats string n times |
| `chars()` (Java 8+) | returns `IntStream` of char codes |
| `join()` | static, joins with delimiter |
| `format()` | printf-style formatting |
| `matches(regex)` | full regex match |
| `intern()` | pool interning |
| `toCharArray()` | new copy of char array |

### 1.9 substring() memory leak (Java 6/7 legacy but famous interview question)
- Pre-Java 7: `substring()` shared the **same underlying char[]** as original, only offset+length changed → a small substring of a huge string kept the ENTIRE huge array alive in memory (memory leak).
- Java 7+ fix: `substring()` copies the relevant portion into a **new** char array. Slightly slower but memory-safe.

### 1.10 String.format() / text blocks (Java 15+)
```java
String s = String.format("Name: %s, Age: %d", name, age);

// Text block (Java 15+)
String json = """
    {
      "name": "%s"
    }
    """.formatted(name);
```

### 1.11 String Switch (Java 7+)
- Internally uses `hashCode()` + `equals()` (hashCode for jump table, equals for collision-safe match).

### 1.12 String Hashing
```java
s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
```
- 31 chosen because it's an odd prime, and `31*i == (i<<5) - i` — JIT can optimize this to a fast shift+subtract.

---

## 2. STRINGBUFFER

### 2.1 What & why
- Mutable sequence of characters (unlike String).
- Internal char array with a **capacity** that grows dynamically.
- Introduced since Java 1.0 (legacy, thread-safe).

### 2.2 Thread Safety
- **Every public method is `synchronized`** (append, insert, delete, reverse, etc.).
- Makes it safe for multi-threaded access to a shared buffer, but at the **cost of performance** due to lock acquisition/release overhead — even in single-threaded code.

### 2.3 Capacity Mechanics (VERY common advanced Q)
- Default constructor: initial capacity = **16 characters**.
- `new StringBuffer(int capacity)` — custom initial capacity.
- `new StringBuffer(String str)` — capacity = `str.length() + 16`.
- **Growth formula when capacity exceeded:**
  ```
  newCapacity = (oldCapacity + 1) * 2
  ```
  (if that's still not enough, newCapacity = required size)
- Growing involves: allocate new array → `Arrays.copyOf()` old data → discard old array. This is an O(n) operation, amortized O(1) per append over many appends.

```java
StringBuffer sb = new StringBuffer(); // capacity 16
sb.append("HelloWorld1234567"); // 17 chars > 16 → triggers grow: (16+1)*2 = 34
```

### 2.4 Important Methods
| Method | Behavior |
|---|---|
| `append(x)` | overloaded for all types, returns `this` (method chaining) |
| `insert(offset, x)` | inserts at index |
| `delete(start,end)` | removes range |
| `deleteCharAt(i)` | removes one char |
| `replace(start,end,str)` | replaces range |
| `reverse()` | reverses in place |
| `capacity()` | current allocated capacity |
| `length()` | current used length |
| `ensureCapacity(min)` | pre-grow to avoid repeated resizing |
| `trimToSize()` | shrink capacity to actual length |
| `setCharAt(i,c)` | mutate single char |
| `charAt(i)` | read single char |
| `toString()` | converts to immutable String |

### 2.5 StringBuffer vs String equality
```java
StringBuffer sb1 = new StringBuffer("abc");
StringBuffer sb2 = new StringBuffer("abc");
sb1.equals(sb2); // false! StringBuffer does NOT override equals() from Object — compares reference
sb1.toString().equals(sb2.toString()); // true
```
- **Gotcha:** `StringBuffer` and `StringBuilder` do NOT override `equals()`/`hashCode()` — this trips up many candidates.

---

## 3. STRINGBUILDER

### 3.1 What & why
- Introduced in **Java 5** as a drop-in, **non-synchronized** alternative to StringBuffer.
- Identical API to StringBuffer (same superclass lineage: both extend `AbstractStringBuilder`).
- **NOT thread-safe** — no synchronization overhead → significantly faster in single-threaded contexts.

### 3.2 Class Hierarchy (important, often drawn in interviews)
```
CharSequence (interface)
      ↑
AbstractStringBuilder (abstract, package-private, holds char[]/byte[] value + count)
      ↑                    ↑
StringBuilder        StringBuffer
(not synchronized)   (synchronized)
```
- `String` also implements `CharSequence` but does NOT extend `AbstractStringBuilder` — separate hierarchy, immutable.

### 3.3 Performance Benchmark Intuition (explain WHY, don't just memorize)
Order of speed (fastest → slowest) for heavy mutation:
1. **StringBuilder** — no locks
2. **StringBuffer** — same logic + `synchronized` monitor lock/unlock per call
3. **String concatenation (`+=` in loop)** — creates new object + copies every iteration → **O(n²)** overall for n appends

### 3.4 Same capacity/growth mechanics as StringBuffer (they share `AbstractStringBuilder`)

### 3.5 Method Chaining (Builder-pattern-like, though not textbook GoF Builder)
```java
String result = new StringBuilder()
        .append("Hello")
        .append(" ")
        .append("World")
        .insert(0, ">> ")
        .reverse()
        .toString();
```

---

## 4. STRING vs STRINGBUFFER vs STRINGBUILDER — MASTER COMPARISON TABLE

| Feature | String | StringBuffer | StringBuilder |
|---|---|---|---|
| Mutability | Immutable | Mutable | Mutable |
| Thread-safe | Yes (by virtue of immutability) | Yes (synchronized methods) | No |
| Performance | Slow for repeated modification | Slower (sync overhead) | Fastest |
| Storage | String pool (literals) / Heap (`new`) | Heap | Heap |
| Introduced in | JDK 1.0 | JDK 1.0 | JDK 1.5 |
| `equals()` overridden | Yes (content comparison) | No (reference comparison) | No (reference comparison) |
| Underlying structure | `byte[]`/`char[]` (fixed, final) | Resizable `char[]`/`byte[]` | Resizable `char[]`/`byte[]` |
| When to use | Fixed/rarely-changed text, HashMap keys | Multi-threaded mutable text | Single-threaded mutable text, loops |

---

## 5. ADVANCED / 15+ LPA-LEVEL INTERVIEW TOPICS

### 5.1 "Is String really 100% immutable?" — trick question
- Via **Reflection**, you technically CAN mutate the internal array (pre-Java 9 `char[] value`), because `value` is `private final` but reflection can bypass access modifiers.
- This is a famous "gotcha" question to test deep understanding — the answer: "immutable by design/API contract, but reflection can break it (not truly immutable at the JVM memory level); Java 9+ made `value` `private final byte[]`, same reflection risk applies, and this is considered unsafe/unsupported practice."
```java
Field field = String.class.getDeclaredField("value");
field.setAccessible(true);
// can technically modify — but this is undefined behavior / breaks pooling assumptions, never do in production
```

### 5.2 Why does String override `hashCode()` and cache it?
```java
private int hash; // cache
public int hashCode() {
    int h = hash;
    if (h == 0 && value.length > 0) {
        h = computeHash();
        hash = h;
    }
    return h;
}
```
- Because String is immutable, hash is guaranteed constant → compute once, reuse forever. Critical for `HashMap<String,...>` performance since `hashCode()` is called on every `get/put`.

### 5.3 Why is `String` final?
- Prevents subclasses from overriding methods like `equals()`, `hashCode()`, or bypassing immutability guarantees (e.g., a subclass could add mutable state), which would break the security/pool assumptions the whole JVM (classloading, reflection, networking) relies on.

### 5.4 StringBuilder in Multi-threading — common misconception
- "StringBuilder is not thread safe" does NOT mean it throws an exception in a single-threaded context; it means **if shared across threads without external synchronization**, you get race conditions, data corruption, `ArrayIndexOutOfBoundsException` under concurrent resize, or lost appends.
- If you need thread safety with better performance than StringBuffer, options:
  - Use `StringBuffer`.
  - Wrap `StringBuilder` with your own external synchronization (`synchronized` block).
  - Use thread-confinement (each thread has its own local StringBuilder, merge at the end).

### 5.5 Interview trap: `final String` reference vs immutability
```java
final String s = "abc";
s = "def"; // COMPILE ERROR — final prevents reassignment of reference
```
- Different from immutability: `final` = reference can't be reassigned; immutable = object's internal state can't change. String is naturally immutable; `final` on the variable is a separate, additional constraint on the reference.

### 5.6 String Pool and Garbage Collection
- Since Java 7, pool lives in heap → **eligible for GC** if no live references point to a pooled string (in theory; in practice literals from loaded classes are often held by the classloader for the class's lifetime).
- Before Java 7 (Perm Gen) → pool was essentially never GC'd → could cause `OutOfMemoryError: PermGen space` with excessive `intern()` usage.

### 5.7 When does `+=` concatenation in a loop NOT get auto-optimized?
- The JIT/javac's `invokedynamic`-based concat (Java 9+, JEP 280) optimizes a **single compound `+` expression**, not a loop with reassignment across iterations. Each loop iteration is a separate bytecode "expression" → still allocates fresh underlying structures each time (though Java 9+ implementation is more efficient than the classic per-op `new StringBuilder()`).
- **Always prefer explicit `StringBuilder` for loops** — this remains true and is a strong signal of Java maturity in interviews.

### 5.8 Deep-dive: `substring`, `intern`, and memory in modern JDKs
- Practical example scenario asked in senior interviews: "You are parsing a 2GB log file and extracting 10-char tokens via substring() into a List<String> that lives for the app's lifetime. Any memory concern?"
  - Answer: Post Java 7, `substring()` copies only the needed portion, so no leak of the huge original string. But if you want to deduplicate repeated tokens (many identical tokens across the file) to reduce memory further, use `.intern()` selectively (be cautious: excessive interning of unique strings can bloat the pool instead).

### 5.9 CharSequence — the common interface
```java
CharSequence cs1 = "hello";               // String
CharSequence cs2 = new StringBuilder("x"); // StringBuilder
CharSequence cs3 = new StringBuffer("y");  // StringBuffer
```
- Useful for API design: methods that accept `CharSequence` work with String, StringBuilder, StringBuffer, and `CharBuffer` uniformly — reduces unnecessary `toString()` calls, saves allocations. (E.g., `String.valueOf(CharSequence)`, regex `Matcher`, I/O `Appendable`.)
- `Appendable` interface — `StringBuilder`, `StringBuffer`, `Writer`, `PrintStream` implement it; supports generic "append text somewhere" APIs.

### 5.10 StringJoiner (Java 8) — related utility, often asked alongside
```java
StringJoiner sj = new StringJoiner(", ", "[", "]");
sj.add("a").add("b").add("c");
System.out.println(sj); // [a, b, c]
```
- `String.join(", ", list)` uses `StringJoiner` internally.

### 5.11 Performance Complexity Summary (for system design / DSA rounds)
| Operation | String | StringBuilder/Buffer |
|---|---|---|
| Append (single) | O(n) — new object + copy | Amortized O(1) |
| n Appends total | O(n²) | O(n) amortized |
| Access char at index | O(1) | O(1) |
| Reverse | Manual, O(n), new object | O(n) in-place |
| Equality check | O(n), content-based | O(1) reference-based (gotcha!) |

### 5.12 GC & Escape Analysis (JIT advanced)
- Modern JIT (via Escape Analysis) can perform **Scalar Replacement**: if a `StringBuilder` created inside a method never "escapes" (not returned, not stored elsewhere), the JVM may allocate it **on the stack** or eliminate the allocation entirely, avoiding heap pressure/GC — this is why microbenchmarks of local StringBuilder usage can look deceptively fast; always benchmark realistically (JMH) rather than trust naive timing loops.

### 5.13 Common Coding-Round Use Cases
- **Palindrome check**: `new StringBuilder(s).reverse().toString().equals(s)`
- **Reverse words in a sentence**: split → StringBuilder loop → join
- **Anagram check**: sort char arrays and compare, or frequency `int[26]` array (more optimal O(n) vs O(n log n) sort)
- **Building large output (CSV/JSON manually)**: always StringBuilder, never `+=`

---

## 6. RAPID-FIRE INTERVIEW Q&A (for quick revision)

**Q: Why is String immutable but StringBuilder mutable?**
A: Design trade-off — String optimizes for safety, sharing (pool), and use as a reliable key/identifier; StringBuilder optimizes for efficient repeated mutation.

**Q: Can two String objects with same value have different hashcodes?**
A: No — `hashCode()` is purely a function of content for String, guaranteed consistent.

**Q: Does `str1 == str2` ever return true for two different `new String()` calls?**
A: No, `new` always allocates a distinct heap object; `==` will be false regardless of content, unless you `intern()` both.

**Q: What happens internally when you call `sb.append(anotherStringBuilder)`?**
A: `append(CharSequence)` overload is invoked; internally copies chars from the argument's backing array into `this`'s buffer (grows if needed).

**Q: Is StringBuffer obsolete?**
A: Not obsolete, but rarely the right choice today — prefer `StringBuilder` + explicit synchronization or thread-confinement for better control and performance; StringBuffer is mostly seen in legacy code.

**Q: How would you make StringBuilder thread-safe without switching to StringBuffer?**
A: Wrap critical sections in `synchronized(sb) { ... }`, or use `Collections.synchronizedX`-style wrapper (not built-in for StringBuilder, so manual), or better — avoid shared mutable state (thread-local builders merged at the end).

---

## 7. QUICK MEMORY DIAGRAM (textual)

```
Heap
 ├── String Pool (SCP)
 │     "java" ← s1, s2 (same reference)
 │     "abc"  ← d (after intern())
 │
 ├── Regular Heap Objects
 │     String obj @0x123 "java" ← s3 (new String("java"))
 │     StringBuilder obj @0x456 { char[] value; int count; }
 │     StringBuffer obj @0x789 { char[] value; int count; } (synchronized methods)
```

---

### Final Tip for 15+ LPA interviews
Interviewers at this level rarely ask "what is StringBuilder" flatly — they probe **why** (immutability rationale, hashcode caching, pool mechanics, JIT/escape analysis, thread-safety trade-offs) and **when** (choosing right tool for concurrent vs single-threaded, memory-sensitive parsing). Be ready to **draw the memory model on a whiteboard** and **justify each design decision**, not just recite definitions.
