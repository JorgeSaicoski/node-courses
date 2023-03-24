const { associateQuestionsAnswered } = require('../associateQuestionsAnswered')
const { getItem, updateItem } = require('../../../middlewares/mongo') // mock dependencies
const User = require("../../../models/user")
const Question = require("../../../models/question")

jest.mock('../../../middlewares/mongo', () => ({
    getItem: jest.fn(),
    updateItem: jest.fn(),
}))
describe('associateQuestionsAnswered', () => {
    let req, res

    beforeEach(() => {
        req = {
            body: {
                user: {
                    _id: 'user-id'
                },
                questionsAnswered: [
                    {
                        question: {
                            _id: 'question-id-1'
                        },
                        optionsSelected: 'option-1'
                    },
                    {
                        question: {
                            _id: 'question-id-2'
                        },
                        optionsSelected: 'option-2'
                    }
                ]
            }
        }
        res = {
            status: jest.fn(() => res),
            json: jest.fn()
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should return 400 if questionsAnswered is not a list', async () => {
        req.body.questionsAnswered = null
        await associateQuestionsAnswered(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'QuestionsAnswered must be in a list' })
    })

    it('should return 400 if question is missing id', async () => {
        req.body.questionsAnswered = [      {        question: {}      }    ]
        await associateQuestionsAnswered(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'Question must contain an ID' })
    })

})
