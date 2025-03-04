import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from "react-native";
import React, { useRef, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";

const targetImg = require("@/assets/images/target.png");
const shiledImg = require("@/assets/images/shield.png");
const bluediaImg = require("@/assets/images/bluedia.png");
const reddiaImg = require("@/assets/images/reddia.png");
const convenienceImg = require("@/assets/images/convenience.png");
const policeImg = require("@/assets/images/police.png");
const hospitalImg = require("@/assets/images/hospital.png");
const firestationImg = require("@/assets/images/firestation.png");
const genderFightImg = require("@/assets/images/genderFight.png");
const theftImg = require("@/assets/images/theft.png");

const convenienceN = 2;
const convenienceLoc = [
  { name: "CU 영통학사점", address: "경기도 용인시 기흥구 서그내로 21", distance: "430" },
  { name: "GS25 서천현대점", address: "경기도 용인시 기흥구 서그내로16번길 11", distance: "550" },
];
const policeN = 1;
const policeLoc = [{ name: "서천파출소", address: "경기도 용인시 기흥구 서천동 805 서천파출소", distance: "300" }];
const hospitalN = 1;
const hospitalLoc = [{ name: "영통구보건소", address: "경기도 수원시 영통구 영통로 396", distance: "1400" }];
const firestationN = 1;
const firestationLoc = [{ name: "수원소방서영통119안전센터", address: "경기도 수원시 영통구 매영로 325", distance: "1500" }];

const safeSentence = ["위험해요", "안전해요"];
const circleColor = { safe: ["#4876FF", "#DFE2FF"], danger: ["#FF566A", "#FFDFDF"] };
const danger = 15;
const safe = true;

export default function Panel2({ curr, safeNum }) {
  const [toggleBtn, setToggleBtn] = useState(true);
  const [showBubble, setShowBubble] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [expand, setExpand] = useState(Array(4).fill(false));

  const expandBtn = (idx) => {
    setExpand((prev) => [...prev].map((data, i) => (i === idx ? !data : data)));
  };

  const toggleBubble = () => {
    if (showBubble) {
      // 말풍선을 숨김
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowBubble(false));
    } else {
      setShowBubble(true);
      // 말풍선을 표시
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <View style={[styles.footer, { marginTop: 20 }]}>
        <View style={styles.smallCircle1} />
        <View style={[styles.smallCircle2, { backgroundColor: safeNum <= 3 ? circleColor["safe"][0] : circleColor["danger"][0] }]} />
        <View
          style={[
            styles.circle,
            {
              backgroundColor: safeNum <= 3 ? circleColor["safe"][0] : circleColor["danger"][0],
              borderColor: safeNum <= 3 ? circleColor["safe"][1] : circleColor["danger"][1],
            },
          ]}
        >
          <Text style={{ color: "white", fontSize: 22, fontWeight: "600" }}>{safeNum}</Text>
        </View>
        <Text style={{ color: "black", fontSize: 20, fontWeight: "600", marginLeft: 10 }}>
          {safeNum <= 3 ? safeSentence[1] : safeSentence[0]}
        </Text>
        <View style={{ flexDirection: "row", gap: 6, alignItems: "center", marginLeft: 6 }}>
          <Feather name="alert-circle" size={16} color="#8B94A8" />
          <Text style={{ color: "#8B94A8" }}>{curr}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", width: "100%", justifyContent: "center" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.toggle, { borderBottomColor: toggleBtn ? "black" : "#E9EBF4" }]}
          onPress={() => setToggleBtn(true)}
        >
          <Text>위험정보</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.toggle, { borderBottomColor: toggleBtn ? "#E9EBF4" : "black" }]}
          onPress={() => setToggleBtn(false)}
        >
          <Text>안전시설</Text>
        </TouchableOpacity>
      </View>

      {/* 말풍선 애니메이션 */}
      {showBubble && (
        <Animated.View
          style={[
            styles.speechBubble,
            {
              opacity: fadeAnim, // 말풍선의 투명도를 애니메이션 값에 맞춤
              transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }], // 아래에서 위로 서서히 등장
            },
          ]}
        >
          <View style={styles.speechBubbleTail} />
          <View style={{ gap: 15 }}>
            <Text style={{ color: "#2F323D", fontSize: 14, fontWeight: "600", marginBottom: -10 }}>범죄 유형별 발생건수</Text>
            <Text style={{ color: "#8B94A8", fontSize: 12, fontWeight: "500" }}>
              절도, 강도, 성폭력, 폭력의 발생 건수를 시각적으로 나타내는 트리맵입니다.
            </Text>
            <Text style={{ color: "#8B94A8", fontSize: 12, fontWeight: "500" }}>
              각 사각형의 크기는 범죄 발생 건수에 비례하며, 큰 사각형일수록 해당 범죄가 많이 발생한 것을 의미합니다.
            </Text>
            <View>
              <Text style={{ color: "#8B94A8", fontSize: 12, fontWeight: "500" }}>
                <Text style={{ color: "#2F323D" }}>상향 화살표(↑):</Text> 이 범죄 유형의 발생 건수가 주변보다 높습니다.
              </Text>
              <Text style={{ color: "#8B94A8", fontSize: 12, fontWeight: "500" }}>
                <Text style={{ color: "#2F323D" }}>하향 화살표(↓):</Text> 이 범죄 유형의 발생 건수가 주변보다 낮습니다.
              </Text>
            </View>
          </View>
        </Animated.View>
      )}

      {toggleBtn ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: "100%", marginTop: 24, marginBottom: 24 }}>
          <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ color: "#232323", fontSize: 16, fontWeight: "600" }}>범죄 발생건수</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={toggleBubble}>
              <Feather name="alert-circle" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: "30%",
              marginTop: 16,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            {/* 안전할떄 */}
            {/* <View style={styles.crimeBox}>
              <Image source={shiledImg} style={{ width: 30, height: 30 }} />
              <Text style={{ color: "#1C1C22", fontSize: 16, fontWeight: "600" }}>0건</Text>
              <Text style={{ color: "#8B94A8", fontSize: 12, fontWeight: "500" }}>최근 1년 간 발생한 범죄가 없습니다</Text>
            </View> */}

            {/* 위험할때 */}
            <View
              style={{
                width: "40%",
                height: "100%",
                backgroundColor: "#FF566A",
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Image source={theftImg} style={{ width: 30, height: 30 }} />
              <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>절도</Text>
              <Text style={{ fontSize: 14, fontWeight: "400", color: "white" }}>8건</Text>
            </View>
            <View
              style={{
                width: "30%",
                height: "100%",
                backgroundColor: "#FF7888",
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Image source={genderFightImg} style={{ width: 30, height: 30 }} />
              <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>성폭력</Text>
              <Text style={{ fontSize: 14, fontWeight: "400", color: "white" }}>4건</Text>
            </View>
            <View style={{ width: "20%", height: "100%", justifyContent: "space-between" }}>
              <View style={{ height: "55%", backgroundColor: "#FFBEC5", borderRadius: 15, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "#1C1C22", fontSize: 14, fontWeight: "600" }}>
                  폭력<Text style={{ fontSize: 12, fontWeight: "400" }}> 2건</Text>
                </Text>
              </View>
              <View style={{ height: "40%", backgroundColor: "#FFE9EC", borderRadius: 15, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "#1C1C22", fontSize: 14, fontWeight: "600" }}>
                  강도<Text style={{ fontSize: 12, fontWeight: "400" }}> 1건</Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={{ gap: 16 }}>
            {/* 안전할떄 */}
            {/* <View style={styles.crimeinfobox}>
              <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 5 }}>
                <Image source={bluediaImg} style={{ width: 11, height: 14 }} />
                <Text style={[styles.infotitle, { color: "#4876FF" }]}>매우 안전</Text>
              </View>
              <Text style={styles.infodetail}>
                이 구역에서는 최근 특정 기간 동안 범죄가 발생하지 않았습니다. 안전한 지역으로 평가되며, 안심하고 생활할 수 있는 환경을
                제공합니다.
              </Text>
            </View>
            <View style={styles.crimeinfobox}>
              <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 5 }}>
                <Image source={bluediaImg} style={{ width: 11, height: 14 }} />
                <Text style={[styles.infotitle, { color: "#4876FF" }]}>매우 안전</Text>
              </View>
              <Text style={styles.infodetail}>
                이 구역에서는 최근 특정 기간 동안 범죄가 발생하지 않았습니다. 안전한 지역으로 평가되며, 안심하고 생활할 수 있는 환경을
                제공합니다.
              </Text>
            </View> */}

            {/* 위험할떄 */}
            <View style={styles.crimeinfobox}>
              <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 5 }}>
                <Image source={reddiaImg} style={{ width: 11, height: 14 }} />
                <Text style={[styles.infotitle, { color: "#FF566A" }]}>절도주의 · 소지품 주의</Text>
              </View>
              <Text style={styles.infodetail}>
                절도 사건 비중이 높고, 인근 다른 구역에 비해 절도 사건이 30% 더 많이 발생하니 주의가 필요합니다. 혼잡한 지역이나 어두운
                골목에서의 소지품 관리를 강화하세요.
              </Text>
            </View>
            <View style={styles.crimeinfobox}>
              <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 5 }}>
                <Image source={reddiaImg} style={{ width: 11, height: 14 }} />
                <Text style={[styles.infotitle, { color: "#FF566A" }]}>성폭력 주의 · 안전시설 파악</Text>
              </View>
              <Text style={styles.infodetail}>
                성폭력 사건이 빈번하게 발생하는 지역입니다. 여성 이용자분들은 특히 야간 이동 시 주의를 기울이시고, 주변의 안전 시설을 미리
                파악해 두세요.
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 250 }} />
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: "100%", marginTop: 24 }}>
          <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ color: "#232323", fontSize: 16, fontWeight: "600" }}>내주변 안전시설</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={toggleBubble}>
              <Feather name="alert-circle" size={20} color="black" />
            </TouchableOpacity>
          </View>

          {/* 편의점 */}
          <View style={styles.safebox}>
            <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
              <Image source={convenienceImg} style={{ width: 30, height: 30 }} />
              <Text style={{ color: "#1C1C22", fontSize: 16, fontWeight: "600" }}>편의점</Text>
              <Text style={{ color: "#575C71", fontSize: 14, fontWeight: "400" }}>{convenienceN}곳</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginRight: 8 }}>
              <Image source={targetImg} style={{ width: 24, height: 24 }} />
              <TouchableOpacity activeOpacity={0.9} onPress={() => expandBtn(0)}>
                <EvilIcons name={expand[0] ? "chevron-up" : "chevron-down"} size={50} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          {expand[0] && convenienceN !== 0 && (
            <View style={styles.moreinfobox}>
              {convenienceLoc.map((data, idx) => (
                <View style={{ width: "90%", gap: 6.5 }} key={idx}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={{ color: "#1C1C22", fontSize: 14, fontWeight: "600" }}>{data.name}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={{ color: "#4876FF", fontSize: 14, fontWeight: "600" }}>{data.distance}m</Text>
                      <View style={{ flexDirection: "row", backgroundColor: "#F3F6FF", paddingHorizontal: 6, paddingVertical: 4 }}>
                        <Text style={{ fontSize: 12, fontWeight: "600", color: "#4876FF" }}>길찾기</Text>
                        <MaterialCommunityIcons name="arrow-up-right" size={12} color="#4876FF" />
                      </View>
                    </View>
                  </View>
                  <Text style={{ color: "#8B94A8", fontSize: 12, fontWeight: "500" }}>{data.address}</Text>
                  <Divider />
                </View>
              ))}
            </View>
          )}

          {/* 경찰서 */}
          <View style={styles.safebox}>
            <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
              <Image source={policeImg} style={{ width: 30, height: 30 }} />
              <Text style={{ color: "#1C1C22", fontSize: 16, fontWeight: "600" }}>경찰서</Text>
              <Text style={{ color: "#575C71", fontSize: 14, fontWeight: "400" }}>{policeN}곳</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginRight: 8 }}>
              <Image source={targetImg} style={{ width: 24, height: 24 }} />
              <TouchableOpacity activeOpacity={0.9} onPress={() => expandBtn(1)}>
                <EvilIcons name={expand[1] ? "chevron-up" : "chevron-down"} size={50} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          {expand[1] && policeN !== 0 && (
            <View style={styles.moreinfobox}>
              {policeLoc.map((data, idx) => (
                <View style={{ width: "90%", gap: 6.5 }} key={idx}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={{ color: "#1C1C22", fontSize: 14, fontWeight: "600" }}>{data.name}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={{ color: "#4876FF", fontSize: 14, fontWeight: "600" }}>{data.distance}m</Text>
                      <View style={{ flexDirection: "row", backgroundColor: "#F3F6FF", paddingHorizontal: 6, paddingVertical: 4 }}>
                        <Text style={{ fontSize: 12, fontWeight: "600", color: "#4876FF" }}>길찾기</Text>
                        <MaterialCommunityIcons name="arrow-up-right" size={12} color="#4876FF" />
                      </View>
                    </View>
                  </View>
                  <Text style={{ color: "#8B94A8", fontSize: 12, fontWeight: "500" }}>{data.address}</Text>
                  <Divider />
                </View>
              ))}
            </View>
          )}

          {/* 병원 */}
          <View style={styles.safebox}>
            <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
              <Image source={hospitalImg} style={{ width: 30, height: 30 }} />
              <Text style={{ color: "#1C1C22", fontSize: 16, fontWeight: "600" }}>병원</Text>
              <Text style={{ color: "#575C71", fontSize: 14, fontWeight: "400" }}>{hospitalN}곳</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginRight: 8 }}>
              <Image source={targetImg} style={{ width: 24, height: 24 }} />
              <TouchableOpacity activeOpacity={0.9} onPress={() => expandBtn(2)}>
                <EvilIcons name={expand[2] ? "chevron-up" : "chevron-down"} size={50} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          {expand[2] && hospitalN !== 0 && (
            <View style={styles.moreinfobox}>
              {hospitalLoc.map((data, idx) => (
                <View style={{ width: "90%", gap: 6.5 }} key={idx}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={{ color: "#1C1C22", fontSize: 14, fontWeight: "600" }}>{data.name}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={{ color: "#4876FF", fontSize: 14, fontWeight: "600" }}>{data.distance}m</Text>
                      <View style={{ flexDirection: "row", backgroundColor: "#F3F6FF", paddingHorizontal: 6, paddingVertical: 4 }}>
                        <Text style={{ fontSize: 12, fontWeight: "600", color: "#4876FF" }}>길찾기</Text>
                        <MaterialCommunityIcons name="arrow-up-right" size={12} color="#4876FF" />
                      </View>
                    </View>
                  </View>
                  <Text style={{ color: "#8B94A8", fontSize: 12, fontWeight: "500" }}>{data.address}</Text>
                  <Divider />
                </View>
              ))}
            </View>
          )}

          {/* 소방서 */}
          <View style={styles.safebox}>
            <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
              <Image source={firestationImg} style={{ width: 30, height: 30 }} />
              <Text style={{ color: "#1C1C22", fontSize: 16, fontWeight: "600" }}>소방서</Text>
              <Text style={{ color: "#575C71", fontSize: 14, fontWeight: "400" }}>{firestationN}곳</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginRight: 8 }}>
              <Image source={targetImg} style={{ width: 24, height: 24 }} />
              <TouchableOpacity activeOpacity={0.9} onPress={() => expandBtn(3)}>
                <EvilIcons name={expand[3] ? "chevron-up" : "chevron-down"} size={50} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          {expand[3] && firestationN !== 0 && (
            <View style={styles.moreinfobox}>
              {firestationLoc.map((data, idx) => (
                <View style={{ width: "90%", gap: 6.5 }} key={idx}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={{ color: "#1C1C22", fontSize: 14, fontWeight: "600" }}>{data.name}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={{ color: "#4876FF", fontSize: 14, fontWeight: "600" }}>{data.distance}m</Text>
                      <View style={{ flexDirection: "row", backgroundColor: "#F3F6FF", paddingHorizontal: 6, paddingVertical: 4 }}>
                        <Text style={{ fontSize: 12, fontWeight: "600", color: "#4876FF" }}>길찾기</Text>
                        <MaterialCommunityIcons name="arrow-up-right" size={12} color="#4876FF" />
                      </View>
                    </View>
                  </View>
                  <Text style={{ color: "#8B94A8", fontSize: 12, fontWeight: "500" }}>{data.address}</Text>
                  <Divider />
                </View>
              ))}
            </View>
          )}
          <View style={[styles.crimeinfobox, { marginTop: 24 }]}>
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 5 }}>
              <Image source={bluediaImg} style={{ width: 11, height: 14 }} />
              <Text style={[styles.infotitle, { color: "#4876FF" }]}>치안 유지 · 긴급 의료/화재 대응 가능</Text>
            </View>
            <Text style={styles.infodetail}>
              이 구역은 경찰서, 병원, 소방서와 같은 주요 안전시설이 고르게 분포되어 있습니다. 경찰서의 위치 덕분에 치안이 비교적 잘 유지되고
              있으며, 병원과 소방서가 있어 긴급 의료 서비스나 화재 대응이 빠르게 이루어질 수 있습니다. 또한, 편의점이 다수 위치해 있어
              언제든지 접근 가능한 안전한 장소를 제공하며, 야간에도 밝고 안전한 환경이 유지됩니다.
            </Text>
          </View>
          <View style={{ marginBottom: 150 }} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  circle: {
    backgroundColor: "#4876FF",
    borderWidth: 4,
    borderColor: "#DFE2FF",
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  smallCircle1: {
    width: 12.5,
    height: 12.5,
    backgroundColor: "#8B94A8",
    borderRadius: 100,
    position: "relative",
    top: -15,
  },
  smallCircle2: {
    width: 7.5,
    height: 7.5,
    backgroundColor: "#4876FF",
    borderRadius: 100,
    position: "absolute",
    top: -5,
    left: 15,
  },
  toggle: {
    width: "55%",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E9EBF4",
    justifyContent: "center",
    alignItems: "center",
  },
  crimeBox: {
    width: "100%",
    height: 140,
    backgroundColor: "#F8F9FE",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  crimeinfobox: {
    width: "100%",
    padding: 16,
    borderColor: "#E9EBF4",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 8.5,
  },
  infotitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  infodetail: {
    fontSize: 14,
    fontWeight: "500",
    color: "#575C71",
    lineHeight: 19.6,
    letterSpacing: -0.28,
  },
  speechBubble: {
    width: 250,
    position: "absolute",
    top: 115,
    left: 60,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E9EBF4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 99,
  },

  speechBubbleTail: {
    position: "absolute",
    top: 25,
    right: -15,
    width: 0,
    height: 0,
    borderTopWidth: 20,
    borderBottomWidth: 20,
    borderLeftWidth: 20,
    borderStyle: "solid",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "white",
    zIndex: 1,
  },
  safebox: {
    width: "100%",
    paddingVertical: 10,
    paddingLeft: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9EBF4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  moreinfobox: {
    backgroundColor: "#F6F9FC",
    width: "110%",
    padding: 16,
    gap: 12,
    marginTop: -7,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderColor: "#E9EBF4",
  },
});
