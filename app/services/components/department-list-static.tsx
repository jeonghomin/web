"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Stethoscope, Brain, Baby, Bone, Activity, UserCircle2 } from "lucide-react";

const departments = [
  // 한방 진료과목
  {
    icon: Stethoscope,
    title: "한방 내과",
    description: "한방 내과 진료",
    type: "한방",
  },
  {
    icon: Brain,
    title: "안이비인후과 (이명, 어지럼증)",
    description: "안이비인후과 진료 - 이명, 어지럼증 전문",
    type: "한방",
  },
  {
    icon: UserCircle2,
    title: "사상체질과",
    description: "사상체질과 진료",
    type: "한방",
  },
  {
    icon: Activity,
    title: "침구과",
    description: "침구과 진료",
    type: "한방",
  },
  {
    icon: Activity,
    title: "재활의학과",
    description: "재활의학과 진료",
    type: "한방",
  },
  {
    icon: Brain,
    title: "신경정신과 (불면, 불안, 공황장애)",
    description: "신경정신과 진료 - 불면, 불안, 공황장애 전문",
    type: "한방",
  },
  {
    icon: Activity,
    title: "피부과 (건선)",
    description: "피부과 진료 - 건선 전문",
    type: "한방",
  },
  {
    icon: Baby,
    title: "소아과 (발육부진)",
    description: "소아과 진료 - 발육부진 전문",
    type: "한방",
  },
  {
    icon: Activity,
    title: "부인과 (불임, 난임)",
    description: "부인과 진료 - 불임, 난임 전문",
    type: "한방",
  },
  // 양방 진료과목
  {
    icon: Activity,
    title: "외과",
    description: "외과 진료",
    type: "양방",
  },
  {
    icon: Bone,
    title: "정형외과",
    description: "정형외과 진료",
    type: "양방",
  },
  {
    icon: Brain,
    title: "이비인후과",
    description: "이비인후과 진료",
    type: "양방",
  },
  {
    icon: Activity,
    title: "피부과",
    description: "피부과 진료",
    type: "양방",
  },
  {
    icon: Stethoscope,
    title: "내과",
    description: "내과 진료",
    type: "양방",
  },
];

export function DepartmentListStatic() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">진료과목</h2>
          <p className="text-gray-600">각 분야 전문의가 정성을 다해 진료합니다</p>
        </motion.div>

        {/* 한방 진료과목 */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">한방 진료과목</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments
              .filter((dept) => dept.type === "한방")
              .map((dept, index) => (
                <motion.div
                  key={dept.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <dept.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">{dept.title}</h3>
                    </div>
                    <p className="text-gray-600">{dept.description}</p>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>

        {/* 양방 진료과목 */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-center">양방 진료과목</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments
              .filter((dept) => dept.type === "양방")
              .map((dept, index) => (
                <motion.div
                  key={dept.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <dept.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">{dept.title}</h3>
                    </div>
                    <p className="text-gray-600">{dept.description}</p>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

