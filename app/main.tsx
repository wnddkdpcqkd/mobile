import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Animated, TouchableWithoutFeedback, Dimensions } from "react-native";
import SkeletonPlaceholder from "@/components/skeletons";
import { colors } from "@/constants/colors";
import { useNavigation } from "@react-navigation/native";

const marketImg = require("@/assets/images/market.png");
const coinkeyImg = require("@/assets/images/coinkey.png");
const mykeyImg = require("@/assets/images/mykey.png");
const menuImg = require("@/assets/images/menu.png");
const closeImg = require("@/assets/images/close.png");

export default function Home() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState({
    안전시설: true,
    범죄: true,
    안전도: true,
    코인키: true,
  });

  const handleSelect = (item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  useEffect(() => {
    //메인화면에서 필요한 데이터 가져오는 부분
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <SkeletonPlaceholder />;
  }

  const openModal = () => {
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topBox1}>
          <Image source={require("@/assets/images/coinkey.png")} style={{ width: 12, height: 20 }} />
          <Text style={styles.keyCount}>350</Text>
        </View>
        <View style={styles.topBox2}>
          {Object.keys(selectedItems).map((key) => (
            <TouchableOpacity
              key={key}
              style={[styles.checkbox, { opacity: selectedItems[key] ? 1 : 0.5 }]}
              onPress={() => handleSelect(key)}
              activeOpacity={0.8}
            >
              <Image source={require("@/assets/images/check.png")} style={styles.checkImg} />
              <Text style={styles.checkText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity activeOpacity={0.6} style={styles.footerBox1}>
          <Text style={styles.safecall}>AI 안심전화</Text>
          <Image source={require("@/assets/images/headphones.png")} style={styles.headphone} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.footerBox2} onPress={modalVisible ? closeModal : openModal}>
          <Image source={menuImg} style={styles.menu} />
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent animationType="none">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
                <TouchableOpacity style={styles.modalOptionBox} activeOpacity={0.7}>
                  <Image source={marketImg} style={{ width: 28, height: 25 }} />
                </TouchableOpacity>
                <Text style={styles.modalOption}>상점</Text>
                <TouchableOpacity style={styles.modalOptionBox} activeOpacity={0.7}>
                  <Image source={coinkeyImg} style={{ width: 17, height: 27 }} />
                </TouchableOpacity>
                <Text style={styles.modalOption}>코인키</Text>
                <TouchableOpacity style={styles.modalOptionBox} activeOpacity={0.7}>
                  <Image source={mykeyImg} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
                <Text style={styles.modalOption}>마이키</Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.closeBox} onPress={closeModal}>
                  <Image source={closeImg} style={styles.close} />
                </TouchableOpacity>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
  },
  top: {
    width: "100%",
    height: 40,
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topBox1: {
    width: 100,
    backgroundColor: colors.purple,
    alignItems: "center",
    paddingLeft: 22,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: "row",
    gap: 10,
    shadowColor: colors.purple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  keyCount: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  topBox2: {
    width: 280,
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 13,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  checkImg: {
    width: 18,
    height: 10,
  },
  checkText: {
    fontSize: 13,
    fontWeight: "500",
  },
  selection: {
    width: "15%",
    height: "15%",
    backgroundColor: "#d9d9d9",
  },
  footer: {
    width: "100%",
    height: 150,
    backgroundColor: "white",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#959595",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  footerBox1: {
    paddingVertical: 13,
    paddingHorizontal: 90,
    borderColor: "#C5CCD7",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  safecall: {
    fontSize: 17,
    marginRight: 6,
    fontWeight: "600",
  },
  headphone: {
    width: 20,
    height: 20,
  },
  footerBox2: {
    padding: 13,
    marginLeft: 10,
    backgroundColor: "#8D94A3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  closeBox: {
    padding: 13,
    marginLeft: 10,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -52,
    right: 6.5,
  },
  menu: {
    width: 20,
    height: 20,
  },
  close: {
    width: 15,
    height: 15,
    margin: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  modalContent: {
    marginRight: 18,
    marginBottom: 105,
  },
  modalOption: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    color: "white",
    marginBottom: 35,
  },
  modalOptionBox: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    padding: 12,
    marginBottom: 10,
    borderRadius: 15,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
