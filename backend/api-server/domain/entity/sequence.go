package entity

type Sequence struct {
	Table         string `dynamo:"table"`
	CurrentNumber int    `dynamo:"currentNumber"`
}
