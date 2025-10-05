"use client"
 
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Award, BookOpen, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  category: string
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "Why is it important to follow the 3-Zone Cleaning Method?",
    options: [
      "It saves time",
      "It reduces noise in the ward",
      "It lowers infection risk",
      "It looks more professional",
    ],
    correctAnswer: 2,
    category: "Fundamentals",
    explanation:
      "The 3-Zone method is specifically designed to reduce infection risk by systematically cleaning from high-risk to low-risk areas.",
  },
  {
    id: 2,
    question: "What does the RED Zone refer to?",
    options: ["Floor area", "From waist to floor", "Above outstretched hand", "Toilets only"],
    correctAnswer: 2,
    category: "Zone Classification",
    explanation:
      "The RED Zone includes all areas above outstretched hand level, which are typically the hardest to reach and clean.",
  },
  {
    id: 3,
    question: "Which zone includes the bed, monitors, and furniture?",
    options: ["Green Zone", "Yellow Zone", "Red Zone", "Blue Zone"],
    correctAnswer: 1,
    category: "Zone Classification",
    explanation:
      "The Yellow Zone covers the main working area from waist level to outstretched hand, including beds, monitors, and furniture.",
  },
  {
    id: 4,
    question: "What is usually cleaned in the Green Zone?",
    options: ["Ceiling lights", "Switchboards", "Floor", "Curtain rods"],
    correctAnswer: 2,
    category: "Zone Classification",
    explanation: "The Green Zone refers to floor areas and surfaces from waist level down to the floor.",
  },
  {
    id: 5,
    question: "How many trained housekeepers are assigned per room?",
    options: ["Two", "One", "Three", "Depends on room size"],
    correctAnswer: 1,
    category: "Procedures",
    explanation:
      "One trained housekeeper is assigned per room to ensure accountability and proper execution of the cleaning protocol.",
  },
  {
    id: 6,
    question: "Which of the following is NOT listed in the equipment needed?",
    options: ["Microfiber cloth", "Gloves", "Pressure washer", "Step stool"],
    correctAnswer: 2,
    category: "Equipment",
    explanation:
      "Pressure washers are not used in hospital room cleaning as they can spread contaminants and damage sensitive equipment.",
  },
  {
    id: 7,
    question: "What tool is recommended to clean ceiling corners?",
    options: ["Hand brush", "Step stool and long-handle broom", "Mop", "Vacuum without handle"],
    correctAnswer: 1,
    category: "Equipment",
    explanation:
      "A step stool and long-handle broom provide safe access and effective cleaning of hard-to-reach ceiling corners.",
  },
  {
    id: 8,
    question: "How much time is allotted for RED Zone cleaning?",
    options: ["5 minutes", "10 minutes", "15 minutes", "30 minutes"],
    correctAnswer: 1,
    category: "Time Management",
    explanation:
      "RED Zone cleaning is allocated 10 minutes as it requires careful attention to high, hard-to-reach areas.",
  },
  {
    id: 9,
    question: "What is the correct cleaning sequence for Yellow Zone?",
    options: [
      "Disinfect → Dust → Wipe → Clean",
      "Wipe → Sweep → Mop",
      "Dust → Disinfect → Wipe → Clean",
      "Clean → Dust → Disinfect → Wipe",
    ],
    correctAnswer: 2,
    category: "Procedures",
    explanation:
      "The correct sequence is Dust → Disinfect → Wipe → Clean to ensure thorough decontamination of the main working area.",
  },
  {
    id: 10,
    question: "What is the suggested cleaning time for the Yellow Zone?",
    options: ["10 mins", "15–20 mins", "25–30 mins", "40 mins"],
    correctAnswer: 2,
    category: "Time Management",
    explanation:
      "Yellow Zone requires 25-30 minutes as it includes the most critical patient care areas requiring thorough cleaning.",
  },
  {
    id: 11,
    question: "What is the correct order for Green Zone cleaning?",
    options: [
      "Mop → Disinfect → Sweep",
      "Disinfect → Mop → Sweep",
      "Sweep/Vacuum → Mop → Disinfect",
      "Disinfect → Sweep → Mop",
    ],
    correctAnswer: 2,
    category: "Procedures",
    explanation:
      "Green Zone cleaning follows: Sweep/Vacuum → Mop → Disinfect to remove debris before wet cleaning and final disinfection.",
  },
  {
    id: 12,
    question: "What is included in toilet cleaning?",
    options: ["Lights and fans", "Railings and windows", "Seat, basin, taps, and flush handles", "All of the above"],
    correctAnswer: 3,
    category: "Procedures",
    explanation:
      "Toilet cleaning is comprehensive and includes all surfaces: lights, fans, railings, windows, seat, basin, taps, and flush handles.",
  },
  {
    id: 13,
    question: "What should be done after fumigation?",
    options: ["Reopen immediately", "Wait 10 minutes", "Open only after ventilation", "Spray air freshener"],
    correctAnswer: 2,
    category: "Safety",
    explanation: "After fumigation, rooms should only be reopened after proper ventilation to ensure chemical safety.",
  },
  {
    id: 14,
    question: "Which of the following is NOT part of the final checklist?",
    options: ["Room smells fresh", "Curtains ironed", "Bins emptied", "Zones cleaned and disinfected"],
    correctAnswer: 1,
    category: "Quality Control",
    explanation:
      "Curtain ironing is not part of the standard cleaning checklist - focus is on hygiene and disinfection.",
  },
  {
    id: 15,
    question: "What formula is used for dilution?",
    options: ["V1 × V2 = C1 × C2", "C1 × V1 = C2 × V2", "C1 ÷ V1 = C2 + V2", "C1 + V1 = C2 + V2"],
    correctAnswer: 1,
    category: "Chemical Calculations",
    explanation:
      "The dilution formula C1 × V1 = C2 × V2 is used to calculate proper chemical concentrations for effective disinfection.",
  },
  {
    id: 16,
    question: "To make 1L of 2% BKC from 50% stock, how much stock is needed?",
    options: ["100 mL", "50 mL", "40 mL", "20 mL"],
    correctAnswer: 2,
    category: "Chemical Calculations",
    explanation: "Using C1×V1=C2×V2: 50% × V1 = 2% × 1000mL, so V1 = 40mL of stock solution needed.",
  },
  {
    id: 17,
    question: "How much Sodium Hypochlorite is needed to make 1L of 1% solution from 11% stock?",
    options: ["91 mL", "11 mL", "100 mL", "9.1 mL"],
    correctAnswer: 0,
    category: "Chemical Calculations",
    explanation: "Using the dilution formula: 11% × V1 = 1% × 1000mL, so V1 = 91mL of stock solution needed.",
  },
  {
    id: 18,
    question: "What is the ratio to make 1L of 70% IPA from 99.9% stock?",
    options: [
      "800mL stock + 200mL water",
      "600mL stock + 400mL water",
      "700mL stock + 300mL water",
      "900mL stock + 100mL water",
    ],
    correctAnswer: 2,
    category: "Chemical Calculations",
    explanation: "To make 70% IPA: 99.9% × V1 = 70% × 1000mL, so V1 = 700mL stock + 300mL water.",
  },
  {
    id: 19,
    question: "To make 5L of Lizol solution, how much stock is required?",
    options: ["10mL", "25mL", "50mL", "100mL"],
    correctAnswer: 2,
    category: "Chemical Calculations",
    explanation: "For 5L of Lizol solution at standard dilution ratio, 50mL of stock solution is required.",
  },
  {
    id: 20,
    question: "What must you always ensure while preparing solutions?",
    options: ["Use hot water", "Shake before use", "Label properly", "Add detergent"],
    correctAnswer: 2,
    category: "Safety",
    explanation:
      "Proper labeling is crucial for safety, identification, and preventing mix-ups that could cause serious harm.",
  },
]

export default function Component() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [timeStarted, setTimeStarted] = useState<Date | null>(null)
  const [timeCompleted, setTimeCompleted] = useState<Date | null>(null)

  useEffect(() => {
    if (!timeStarted) {
      setTimeStarted(new Date())
    }
  }, [timeStarted])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = selectedAnswer
      setAnswers(newAnswers)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setTimeCompleted(new Date())
        setShowResults(true)
      }
    }
  }

  const calculateResults = () => {
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].correctAnswer).length
    const percentage = Math.round((correctAnswers / questions.length) * 100)

    const categoryScores = questions.reduce(
      (acc, question, index) => {
        if (!acc[question.category]) {
          acc[question.category] = { correct: 0, total: 0 }
        }
        acc[question.category].total++
        if (answers[index] === question.correctAnswer) {
          acc[question.category].correct++
        }
        return acc
      },
      {} as Record<string, { correct: number; total: number }>,
    )

    return { correctAnswers, percentage, categoryScores }
  }

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: "Excellent", color: "bg-green-500", icon: Award }
    if (percentage >= 80) return { level: "Good", color: "bg-blue-500", icon: CheckCircle }
    if (percentage >= 70) return { level: "Satisfactory", color: "bg-yellow-500", icon: BookOpen }
    return { level: "Needs Improvement", color: "bg-red-500", icon: AlertCircle }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedAnswer(null)
    setShowResults(false)
    setTimeStarted(new Date())
    setTimeCompleted(null)
  }

  if (showResults) {
    const results = calculateResults()
    const performance = getPerformanceLevel(results.percentage)
    const timeTaken =
      timeCompleted && timeStarted ? Math.round((timeCompleted.getTime() - timeStarted.getTime()) / 1000 / 60) : 0

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <performance.icon className="h-16 w-16 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-3" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-800">3Zone Deep Clean Assessment</CardTitle>
              <CardDescription className="text-lg">Training Complete - Performance Report</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white">
                    <div className="text-4xl font-bold">{results.percentage}%</div>
                    <div className="text-lg">
                      {results.correctAnswers}/{questions.length} Correct
                    </div>
                    <Badge className={`mt-2 ${performance.color} text-white`}>{performance.level}</Badge>
                  </div>

                  <div className="flex items-center justify-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>Time: {timeTaken} minutes</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Category Performance</h3>
                  {Object.entries(results.categoryScores).map(([category, score]) => {
                    const categoryPercentage = Math.round((score.correct / score.total) * 100)
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{category}</span>
                          <span className="text-sm text-gray-600">
                            {score.correct}/{score.total} ({categoryPercentage}%)
                          </span>
                        </div>
                        <Progress value={categoryPercentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Review</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {questions.map((question, index) => {
                    const isCorrect = answers[index] === question.correctAnswer
                    const userAnswer = answers[index]

                    return (
                      <Card
                        key={question.id}
                        className={`border-l-4 ${isCorrect ? "border-l-green-500" : "border-l-red-500"}`}
                      >
                        <CardContent className="pt-4">
                          <div className="flex items-start space-x-3">
                            {isCorrect ? (
                              <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                            ) : (
                              <XCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">
                                {question.id}. {question.question}
                              </p>
                              <div className="space-y-1 text-sm">
                                <p className="text-gray-600">
                                  <span className="font-medium">Your answer:</span> {question.options[userAnswer]}
                                </p>
                                {!isCorrect && (
                                  <p className="text-green-600">
                                    <span className="font-medium">Correct answer:</span>{" "}
                                    {question.options[question.correctAnswer]}
                                  </p>
                                )}
                                <Alert className="mt-2">
                                  <AlertCircle className="h-4 w-4" />
                                  <AlertDescription className="text-xs">{question.explanation}</AlertDescription>
                                </Alert>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button
                  onClick={resetQuiz}
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                >
                  Retake Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800">3Zone Deep Clean Assessment</CardTitle>
                <CardDescription>Hospital Cleaning Protocol Training</CardDescription>
              </div>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {currentQuestion + 1} / {questions.length}
              </Badge>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Badge className="bg-blue-100 text-blue-800">{question.category}</Badge>
            </div>
            <CardTitle className="text-xl leading-relaxed">{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? "border-blue-500 bg-blue-50 text-blue-900"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index ? "border-blue-500 bg-blue-500" : "border-gray-300"
                      }`}
                    >
                      {selectedAnswer === index && <div className="w-3 h-3 rounded-full bg-white"></div>}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  if (currentQuestion > 0) {
                    setCurrentQuestion(currentQuestion - 1)
                    setSelectedAnswer(answers[currentQuestion - 1] ?? null)
                  }
                }}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>

              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
