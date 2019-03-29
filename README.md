# Guangzhou Metro 3-letter station code tester

## Introduction

While [Guangzhou Metro](http://www.gzmtr.com/) currently uses a numerical station numbering system for aiding passenger navigation, e.g. using 0101 and GF18 to represent Xilang Station (西塱, Line 1 & Guangfo Line), it is notable that such numbering system is not persistent: the numbers assigned to each station are subject to change due to extension (e.g. Line 7 westward extension to Shunde) and/or realignment of the lines they belong to (e.g. realignment of Lines 2 and 8). Although passengers can quickly get used to the new numbers whenever stations are renumbered, information management is however a major issue for the operator: existing codes that use station numbers to refer to stations may break or behave unexpectedly, resulting in unnecessary troubles in internal communication (between operation staffs, product suppliers, construction corporations, and so on) and information delivery to customers. Hence, an alternative station code system must be implemented to suit the needs of information management in long term.

The 3-letter station code file in this repository is an attempt to assign each station a unique 3-letter code that does not change over time. Such immutability is essential for codes that need to work for a long period of time. In order assign the station codes in a systematic and scientific fashion, the station coding conventions are mostly borrowed from [Hong Kong MTR](http://www.mtr.com.hk) (See [MTR station codes](https://hkrail.fandom.com/wiki/%E6%B8%AF%E9%90%B5%E8%BB%8A%E7%AB%99%E4%BB%A3%E8%99%9F) and [Light Rail stop codes](https://hkrail.fandom.com/wiki/%E8%BC%95%E9%90%B5%E8%BB%8A%E7%AB%99%E4%BB%A3%E8%99%9F), in Traditional Chinese), with some refinements made to fit the existing station names of Guangzhou Metro.

## Station code conventions for Guangzhou Metro
1. Unlike in Hong Kong MTR, the station names of Guangzhou Metro consisting of Hanyu Pinyin are not broken per Chinese character, as shown on the system map and signs. Hence, when assigning station codes, the Hanyu Pinyin portion of station names must first be broken according to the corresponding Chinese characters. For example, "Yuexiu Park" (越秀公园, Line 2) will be broken into "Yue Xiu Park".

2. After breaking up the Hanyu Pinyin portions, a station code will be assigned based on number of words in its English station name:
	1. One word: take first three letters, e.g. **Zoo** (动物园, Line 5) → **ZOO**.
	2. Two words: take first two letters of the first word, and the first letter of the second word, e.g. **Ke**ng**k**ou → **Ke**ng **K**ou (坑口, Line 1) → **KEK**.
	3. Three words or more: take the first letter of the first, second and third word, e.g. **H**an**x**i **C**hanglong → **H**an **X**i **C**hang Long (汉溪长隆, Lines 3 & 7) → **HXC**; **W**an**s**heng**w**ei → **W**an **S**heng **W**ei (万胜围, Lines 4 & 8) → **WSW**.
	
3. The following special cases apply, and should be considered superior to the rules above:
	1. If the station name consists of exactly one Hanyu Pinyin word plus two or more English words before breaking up, e.g. Tianhe Sports Center (体育中心, Line 1) and Tianhe Coach Terminal (天河客运站, Lines 3 & 6), then the Hanyu Pingyin portion is considered altogether as one word. Thus the codes become: **T**ianhe **S**ports **C**enter → **TSC**; **T**ianhe **C**oach **T**erminal → **TCT**.
	2. For railway stations starting with "Guangzhou", the first two letters shall be "GZ", with the third letter being the intial of the word following "Guangzhou", i.e.:
		* **G**uang**z**hou **R**ailway Station (广州火车站, Lines 2 & 5) → **GZR**
		* **G**uang**z**hou **E**ast Railway Station (广州东站, Lines 1 & 3) → **GZE**
		* **G**uang**z**hou **S**outh Railway Station (广州南站, Lines 2 & 7) → **GZS**
		* **G**uang**z**hou **N**orth Railway Station (广州北站, Line 9) → **GZN**
	3. If the station name ends with a locality word (either in Hanyu Pinyin or English), i.e. Dong (东) / East, Xi (西) / West, Nan (南) / South, or Bei (北) / North, the last letter of station code is reserved for this word, e.g.:
		* **B**ai**y**undadao**b**ei → **B**ai **Y**un Da Dao **B**ei (白云大道北, Line 3) → **BYB**
		* **Z**hen**l**ong**X**i → **Z**hen **L**ong **X**i (镇龙西, Line 21) → **ZLX**
		* **Ai**rport **N**. (机场北, Line 3) → **AIN**
		* **H**igher **E**ducation Mega Center **S**. (大学城南, Lines 4 & 7) → **HES**

### Avoidance of code clashing

Based on the rules above, code clashing may take place between some pairs of stations, e.g. Shuanggang (双岗, Line 13) and Shengang (神岗, Line 14). Under such circumstances, certain procedures are taken to avoid code clashing.

1. If the opening date of the two stations are not the same, this procedure is performed on the station that is opened later.
	1. However, in any case that a station is opened later than the opening date of the line / section it belongs to, the station's opening date is treated as equivalent to that of the corresponding line / section. For instance, when dealing with name clashes, Yide Lu (一德路) and Shahe (沙河) stations of Line 6 are treated as opening on December 28, 2013 (opening of Line 6 phase 1), and Botanical Garden (植物园) and Kemulang (柯木塱) stations are treated as opening on December 18, 2016 (opening of Line 6 phase 2).
	
2. If two stations open on the same day, but belong to different lines, the station on the line with the greater number would have its code re-assigned.
	1. Lines that are not numbered, such as Guangfo Line and APM Line, are treated as greater than any numbered lines.
	2. Two lines that are not numbered are compared lexicographically based on the line name abbreviation as shown in the station numbers on the system map, i.e. APM < GF < THZ1.
	
3. If two stations having a code clash are on the same line and opened on the same day, then the name clash avoidance procedure is taken on the station with the greater station number.
	1. On each line, station numbers are assigned in increasing order from west to east, and from south to north.
	2. Example:
		* **Xic**hang → **Xi** **C**hang (西场, Line 5) → **XIC**
		* **X**i**cu**n → **Xi** **C**un (西村, Line 5) → **XCU**

4. Name clash avoidance typically follow these conventions based on the number of words in the station name in English:
	1. Two words: take the first letter of the first word, and the first two letters of the second word, e.g. **X**iao-**ga**ng → **X**iao **Ga**ng (萧岗, Line 2) → **XGA**. (**XIG** is used by Xiaogang station (晓港, Line 8). ) If a code clash still occurs, take the first three letters of the first word, e.g. **Xia**ngang → **Xia**n Gang (暹岗, Line 6) → **XIA**.
	2. Three words: take the first two letters of the first word, and the first letter of the second word.
	3. Four words or more: take the first letter of the first, second, and fourth word.

5. If the procedure above still does not resolve name clashing, go back to the station name in English and combine the appropriate letters, e.g.:
	* **H**e**s**h**a** → **H**e **S**h**a** (河沙, Line 6) → **HSA**

## The automated tester
[The link to the tester page](./index.html)

### My rationale
1. Use `XMLHttpRequest` to create a file reader and read the data file
2. Split the content line by line (delimiter: `\n`), and entry by entry (delimiter: `\t`)
3. Construct three `Map`s to keep track of data read:
	1. from station codes to station objects
	2. from Chinese names to station codes
	3. from English names to station codes
4. When reading the data, check if there are conflicting entries, and add new entries that are not previously in the maps

### Sources I have consulted
* [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
* [MIME](http://www.iana.org/assignments/media-types/media-types.xhtml)
* [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [`async` and `await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
* [JS modules](https://developers.google.com/web/fundamentals/primers/modules)
* [Encapsulation](https://medium.com/front-end-weekly/achieving-complete-data-encapsulation-in-javascript-5454a6b7410b)