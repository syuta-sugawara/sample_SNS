package model

import (
	"backend/api-server/domain/entity"
	"fmt"

	"github.com/guregu/dynamo"
)

type SequenceModel struct {
	sequenceTable dynamo.Table
}

func NewSequenceModel(db *dynamo.DB) SequenceModel {
	return SequenceModel{
		sequenceTable: db.Table("Sequences"),
	}
}

func (sm *SequenceModel) NextID(table string) int {
	s := new(entity.Sequence)
	if err := sm.sequenceTable.Get("table", table).One(s); err != nil {
		fmt.Println(err)
		fmt.Println("create sequence")
		sm.sequenceTable.Update("table", table).Set("currentNumber", 1).Value(s)
		return s.CurrentNumber
	}

	if err := sm.sequenceTable.Update("table", table).Set("currentNumber", s.CurrentNumber+1).Value(s); err != nil {
		fmt.Println(err)
	}

	fmt.Println(s)

	return s.CurrentNumber
}
